import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SEO from "../components/common/SEO";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData); // ✅ pass whole formData including role
      navigate("/login"); // redirect to login after successful signup
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <>
      <SEO title="Join ZIVEK" description="Create your ZIVEK account for exclusive investigative reports and global intelligence." />
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white p-12 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-border">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink tracking-tighter mb-2">Join ZIVEK</h2>
          <p className="text-ink-faint text-sm font-medium">Create your account to start reading.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint ml-4">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint ml-4">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint ml-4">Password</label>
            <input
              type="password"
              name="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              value={formData.password}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-ink text-white rounded-2xl font-semibold uppercase tracking-widest text-xs hover:bg-brand transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm font-bold text-center mt-10 text-ink-faint">
          Already a member?{" "}
          <span
            className="text-brand cursor-pointer hover:underline underline-offset-4 decoration-2"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>

      <p className="mt-8 text-[10px] font-semibold text-ink-faint uppercase tracking-widest">
        &copy; {new Date().getFullYear()} ZIVEK Inc.
      </p>
    </div>
    </>
  );
}
