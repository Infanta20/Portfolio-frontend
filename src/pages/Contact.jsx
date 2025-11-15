import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
      {submitted && <p className="text-green-600 mb-4">Thank you! I'll get back to you soon.</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full p-3 border rounded mb-4 h-32"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded">Send Message</button>
      </form>
    </div>
  );
}
