"use client";

import { FormEvent, useState } from "react";

type ChatResponse = {
  reply: string;
  error?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/chat";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError("Please enter a phrase or sentence.");
      return;
    }

    setLoading(true);
    setError("");
    setReply("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage }),
      });
      const data = (await response.json()) as ChatResponse;

      if (!response.ok) {
        throw new Error(data.error ?? "Backend request failed.");
      }

      setReply(data.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Day 1 MVP</p>
        <h1>AI Engineer English Trainer</h1>
        <p className="description">
          Type a software engineering phrase and get a concise English coaching response.
        </p>

        <form onSubmit={submitMessage} className="chat-form">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="高并发怎么说"
            rows={4}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Asking..." : "Submit"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
        {reply && (
          <div className="reply">
            <h2>Response</h2>
            <p>{reply}</p>
          </div>
        )}
      </section>
    </main>
  );
}
