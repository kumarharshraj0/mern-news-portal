import SEO from "../components/common/SEO";

export default function Contact() {
  return (
    <>
      <SEO title="Contact Us" description="Get in touch with the ZIVEK editorial and support team." />
      <section className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12">
        {/* Left Side */}
        <div>
          <h2 className="text-4xl font-bold mb-4">GET IN TOUCH</h2>
          <h3 className="text-2xl font-semibold mb-6">Contact us</h3>
          <p className="text-gray-600">
            Whether it's a question, suggestion, or request, we’re here to help.
            Reach out to us anytime, and our team will provide the support you need.
          </p>
        </div>

        {/* Right Side (Form) */}
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Enter email address*"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <textarea
              rows="5"
              placeholder="Type message here*"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
    </>
  );
}
