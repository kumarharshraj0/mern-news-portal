import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate("/"); // go to dashboard
    } else {
      setError(res.msg);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white p-12 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-border">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-semibold uppercase tracking-widest mb-6 border border-brand/10">
            Control Center
          </div>
          <h2 className="text-3xl font-bold text-ink tracking-tighter mb-2">Editor Login</h2>
          <p className="text-ink-faint text-sm font-medium">Access your administration workspace.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-semibold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint ml-4">Email Address</label>
            <input
              type="email"
              placeholder="admin@zivek.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint ml-4">Password</label>
            <input
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-ink text-white rounded-2xl font-semibold uppercase tracking-widest text-xs hover:bg-brand transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
          >
            Authenticate
          </button>
        </form>

        <p className="text-sm font-semibold text-center mt-10 text-ink-faint">
          System access only. Contact IT for help.
        </p>
      </div>

      <p className="mt-8 text-[10px] font-semibold text-ink-faint uppercase tracking-widest">
        &copy; {new Date().getFullYear()} ZIVEK Admin Portal
      </p>
    </div>
  );
}


