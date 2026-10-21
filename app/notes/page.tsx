"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const starterNotes = [
  "Plan the weekly design review.",
  "Reply to the client about the final draft.",
  "Update the task board before Friday.",
];

function NotesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "guest@gmail.com";

  const [notes, setNotes] = useState(starterNotes);
  const [draft, setDraft] = useState("");

  const handleAddNote = (event: FormEvent) => {
    event.preventDefault();

    const note = draft.trim();
    if (!note) return;

    setNotes((prev) => [note, ...prev]);
    setDraft("");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-100">Welcome</p>
            <h1 className="mt-2 text-3xl font-bold">Your Notes Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium">
              {email}
            </span>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Log out
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Recent Notes</h2>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                {notes.length} items
              </span>
            </div>

            <div className="space-y-3">
              {notes.map((note, index) => (
                <div
                  key={`${note}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
                >
                  <p className="text-base leading-7">{note}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-slate-800">Add a Note</h2>

            <form onSubmit={handleAddNote} className="space-y-4">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={6}
                placeholder="Write a quick note..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-indigo-700"
              >
                Save Note
              </button>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function NotesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-lg font-medium text-slate-600">Loading notes...</div>}>
      <NotesContent />
    </Suspense>
  );
}
