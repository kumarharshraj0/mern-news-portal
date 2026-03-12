import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await signup(name, email, password, role);
    if (res.success) {
      setSuccess(res.msg);
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
            Internal Access
          </div>
          <h2 className="text-3xl font-bold text-ink tracking-tighter mb-2">Editor Boarding</h2>
          <p className="text-ink-faint text-sm font-medium">Create a new administrator account.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] font-semibold uppercase tracking-widest text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-[10px] font-semibold uppercase tracking-widest text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint ml-4">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field w-full"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint ml-4">Internal Email</label>
            <input
              type="email"
              placeholder="name@zivek.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint ml-4">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field w-full appearance-none bg-no-repeat bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint ml-4">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-ink text-white rounded-2xl font-semibold uppercase tracking-widest text-xs hover:bg-brand transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
          >
            Create Editor Account
          </button>
        </form>

        <p className="text-sm font-semibold text-center mt-10 text-ink-faint">
          Already authorized?{" "}
          <span
            className="text-brand cursor-pointer hover:underline underline-offset-4 decoration-2"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>

      <p className="mt-8 text-[10px] font-semibold text-ink-faint uppercase tracking-widest">
        &copy; {new Date().getFullYear()} ZIVEK Admin Portal
      </p>
    </div>
  );
}
