"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  email: "",
  password: "",
};

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitError, setSubmitError] = useState("");

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const validateForm = () => {
    const nextErrors: { email?: string; password?: string } = {};
    const email = form.email.trim();

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!email.toLowerCase().endsWith("@gmail.com")) {
      nextErrors.email = "Email must end with @gmail.com.";
    }

    if (form.password.length <= 6) {
      nextErrors.password = "Password must be more than 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      setSubmitError("Please fix the highlighted fields.");
      return;
    }

    router.push(`/notes?email=${encodeURIComponent(form.email.trim())}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7ff] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:grid-cols-2">
        <section className="hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium">
              NoteFlow
            </p>
            <h1 className="max-w-sm text-4xl font-bold leading-tight">
              Write down your ideas and keep every thought in one place.
            </h1>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-100">
              Secure access
            </p>
            <p className="mt-2 text-lg font-medium">
              Your notes stay organized, private, and always ready when inspiration hits.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Welcome back
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Login to Notes</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="yourname@gmail.com"
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition ${
                    errors.email ? "border-red-400 ring-2 ring-red-100" : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition ${
                    errors.password ? "border-red-400 ring-2 ring-red-100" : "border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  }`}
                />
                {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
              </div>

              {submitError && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                Login
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
