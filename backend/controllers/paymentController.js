const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const User = require("../models/User");

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("CRITICAL: Razorpay keys are missing in .env");
    return null;
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { plan } = req.body;
    let amount = 0;

    if (plan === "monthly") {
      amount = 1360 * 100; // ₹1360 in paise
    } else if (plan === "yearly") {
      amount = 6460 * 100; // ₹6460 in paise
    } else {
      return res.status(400).json({ msg: "Invalid plan selected" });
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpay = getRazorpayInstance();
    if (!razorpay) return res.status(500).json({ msg: "Payment system not configured" });

    const order = await razorpay.orders.create(options);

    const newOrder = new Order({
      userId: req.user.id,
      razorpayOrderId: order.id,
      amount: amount / 100,
      plan: plan,
      status: "pending",
    });

    await newOrder.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ msg: "Payment initialization failed" });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Signature verified
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "completed",
        },
        { new: true }
      );

      if (!order) return res.status(404).json({ msg: "Order not found" });

      // Update User subscription
      const expiresAt = new Date();
      if (order.plan === "monthly") {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      } else if (order.plan === "yearly") {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      }

      await User.findByIdAndUpdate(req.user.id, {
        isPremium: true,
        subscriptionPlan: order.plan,
        subscriptionExpiresAt: expiresAt,
      });

      res.json({ msg: "Payment verified successfully", isPremium: true });
    } else {
      res.status(400).json({ msg: "Invalid signature, payment verification failed" });
    }
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({ msg: "Payment verification failed" });
  }
};
