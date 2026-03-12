import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../utils/axiosInstance";
import SEO from "../components/common/SEO";

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handlePayment = async (plan) => {
    if (!user) {
      alert("Please login to subscribe");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("/payment/create-order", { plan });
      const { orderId, amount, key } = response.data;

      const options = {
        key: key,
        amount: amount,
        currency: "INR",
        name: "News Portal Premium",
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Subscription`,
        order_id: orderId,
        handler: async function (response) {
          const verifyRes = await axios.post("/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.isPremium) {
            alert("Payment successful! You are now a premium member.");
            // Update local user state
            setUser((prev) => ({ ...prev, isPremium: true, subscriptionPlan: plan }));
            navigate("/");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initialize payment");
    }
  };

  return (
    <>
      <SEO title="ZIVEK Plus" description="Join ZIVEK Plus for premium investigative journalism and ad-free global intelligence." />
      <section className="min-h-screen bg-slate-50 pt-40 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-ink tracking-tighter mb-6">
          ZIVEK Plus
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Unlock the full power of independent journalism with a ZIVEK Plus subscription. 
          Expert analysis, investigative reports, and zero ads.
        </p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Plan 1: Free Trial */}
        <div className="news-card p-10 flex flex-col bg-white border-none shadow-xl shadow-slate-200/50">
          <div className="mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-brand bg-brand/10 px-4 py-1.5 rounded-full">
              Introductory
            </span>
          </div>
          <h3 className="text-3xl font-bold text-ink mb-2">Free Trial</h3>
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-6">7 Days Access</p>
          <div className="mb-8">
            <span className="text-5xl font-bold text-ink tracking-tighter">₹0</span>
          </div>
          <ul className="space-y-4 mb-10 border-t border-slate-100 pt-8 flex-1">
            <li className="text-sm font-medium text-slate-600 flex items-center gap-3">
              <span className="text-brand">✓</span> Full editorial access
            </li>
            <li className="text-sm font-medium text-slate-600 flex items-center gap-3">
              <span className="text-brand">✓</span> Weekly newsletters
            </li>
            <li className="text-sm font-medium text-slate-400 flex items-center gap-3 italic">
              <span className="opacity-20">✕</span> Offline reading
            </li>
          </ul>
          <button
            className="w-full py-4 bg-slate-100 text-ink-faint rounded-2xl font-semibold uppercase tracking-widest text-xs hover:bg-slate-200 transition-all"
            onClick={() => navigate("/")}
          >
            Start Reading
          </button>
        </div>

        {/* Plan 2: Monthly */}
        <div className="news-card p-10 flex flex-col bg-ink border-black shadow-2xl shadow-ink/20 transform md:-translate-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <span className="text-8xl font-bold text-white italic">M</span>
          </div>
          <div className="mb-8 relative z-10">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white bg-white/20 px-4 py-1.5 rounded-full">
              Most Flexible
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2 relative z-10">Monthly</h3>
          <p className="text-white/40 text-sm font-semibold uppercase tracking-widest mb-6 relative z-10">Billed monthly</p>
          <div className="mb-8 relative z-10">
            <span className="text-5xl font-bold text-white tracking-tighter">₹1,360</span>
            <span className="text-white/40 text-lg font-semibold">/mo</span>
          </div>
          <ul className="space-y-4 mb-10 border-t border-white/10 pt-8 flex-1 relative z-10">
            <li className="text-sm font-medium text-white/80 flex items-center gap-3">
              <span className="text-brand">✓</span> Everything in Free
            </li>
            <li className="text-sm font-medium text-white/80 flex items-center gap-3">
              <span className="text-brand">✓</span> Exclusive member-only pod
            </li>
            <li className="text-sm font-medium text-white/80 flex items-center gap-3">
              <span className="text-brand">✓</span> Ad-free experience
            </li>
          </ul>
          <button
            className={`w-full py-4 rounded-2xl font-semibold uppercase tracking-widest text-xs transition-all relative z-10 ${
              user?.isPremium && user?.subscriptionPlan === "monthly"
                ? "bg-white/10 text-white/40 cursor-default"
                : "bg-brand text-white hover:shadow-lg hover:shadow-brand/40 active:scale-[0.98]"
            }`}
            onClick={() => handlePayment("monthly")}
            disabled={user?.isPremium && user?.subscriptionPlan === "monthly"}
          >
            {user?.isPremium && user?.subscriptionPlan === "monthly" ? "Current Plan" : "Select Monthly"}
          </button>
        </div>

        {/* Plan 3: Yearly */}
        <div className="news-card p-10 flex flex-col bg-white border-none shadow-xl shadow-slate-200/50">
          <div className="mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full">
              Best Value
            </span>
          </div>
          <h3 className="text-3xl font-bold text-ink mb-2">Annual</h3>
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-6">Save 60%</p>
          <div className="mb-8">
            <span className="text-5xl font-bold text-ink tracking-tighter">₹6,460</span>
            <span className="text-slate-400 text-lg font-semibold">/yr</span>
          </div>
          <ul className="space-y-4 mb-10 border-t border-slate-100 pt-8 flex-1">
            <li className="text-sm font-medium text-slate-600 flex items-center gap-3">
              <span className="text-brand">✓</span> All Monthly features
            </li>
            <li className="text-sm font-medium text-slate-600 flex items-center gap-3">
              <span className="text-brand">✓</span> Yearly digest (Physical)
            </li>
            <li className="text-sm font-medium text-slate-600 flex items-center gap-3">
              <span className="text-brand">✓</span> Early access to investigations
            </li>
          </ul>
          <button
            className={`w-full py-4 rounded-2xl font-semibold uppercase tracking-widest text-xs transition-all ${
              user?.isPremium && user?.subscriptionPlan === "yearly"
                ? "bg-slate-100 text-slate-300 cursor-default"
                : "bg-ink text-white hover:bg-brand active:scale-[0.98]"
            }`}
            onClick={() => handlePayment("yearly")}
            disabled={user?.isPremium && user?.subscriptionPlan === "yearly"}
          >
            {user?.isPremium && user?.subscriptionPlan === "yearly" ? "Current Plan" : "Select Yearly"}
          </button>
        </div>
      </div>
      
      <p className="mt-16 text-[10px] font-semibold text-ink-faint uppercase tracking-[0.2em]">
        Secure payment via Razorpay &bull; Cancel anytime
      </p>
    </section>
    </>
  );
}
