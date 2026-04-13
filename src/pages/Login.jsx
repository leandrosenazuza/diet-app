import { useState } from "react";
import officialLogo from "../assets/logo-oficial.png";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleQuickLogin = (value, field) => {
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);
    if (value.trim().length > 0) onLogin();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-sand p-4">
      <div className="w-full max-w-lg rounded-3xl border border-brand-earth/35 bg-white/95 p-7 shadow-xl backdrop-blur">
        <div className="mb-5 flex justify-center">
          <img
            src={officialLogo}
            alt="SofaOut Fitness"
            className="h-28 w-auto max-w-[280px] object-contain sm:h-32 sm:max-w-[320px]"
          />
        </div>

        <h1 className="text-center text-2xl font-bold text-brand-ink">
          Let&apos;s Change Habits?
        </h1>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (username.trim() || password.trim()) onLogin();
          }}
        >
          <input
            value={username}
            onChange={(event) => handleQuickLogin(event.target.value, "username")}
            placeholder="User"
            className="w-full rounded-xl border border-brand-earth/55 bg-brand-sand/20 px-4 py-3 text-base font-medium text-brand-ink outline-none transition placeholder:text-brand-earth/75 focus:border-brand-ink focus:ring-2 focus:ring-brand-ink/20"
          />

          <input
            value={password}
            onChange={(event) => handleQuickLogin(event.target.value, "password")}
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-brand-earth/55 bg-brand-sand/20 px-4 py-3 text-base font-medium text-brand-ink outline-none transition placeholder:text-brand-earth/75 focus:border-brand-ink focus:ring-2 focus:ring-brand-ink/20"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[#3b3128] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-brand-earth/30 transition hover:bg-brand-ink"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
