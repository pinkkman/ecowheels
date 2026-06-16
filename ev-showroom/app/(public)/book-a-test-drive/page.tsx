"use client";

import { useState } from "react";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

export default function BookTestDrivePage() {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [errors, setErrors] = useState({ name: "", date: "", slot: "" });
  const [loading, setLoading] = useState(false);

  const dates = Array.from({ length: 3 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    const labels = ["Tomorrow", "Day After", "Third Day"];
    return {
      title: labels[i],
      value: date.toLocaleDateString("en-IN"),
      weekday: date.toLocaleDateString("en-IN", { weekday: "short" }),
      fullDate: date.toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
    };
  });

  const morningSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
  ];

  const eveningSlots = [
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
  ];

  const handleBooking = () => {
    const newErrors = { name: "", date: "", slot: "" };
    let hasError = false;

    if (!name.trim()) { newErrors.name = "Please enter your name."; hasError = true; }
    if (!selectedDate) { newErrors.date = "Please select a date."; hasError = true; }
    if (!selectedSlot) { newErrors.slot = "Please select a time slot."; hasError = true; }

    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);

    const message = `Hello EcoWheels,

I would like to book a test drive.

Name: ${name}
Preferred Date: ${selectedDate}
Preferred Time: ${selectedSlot}

Please confirm my booking.

Thank you.`;

    const whatsappUrl = `https://wa.me/918280531114?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setLoading(false);
    }, 1000);
  };

  return (
      <div style={{ minHeight: "100vh", background: "#0d0000", color: "#fff", position: "relative", overflow: "hidden" }}>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600&display=swap');

        @keyframes shimmer {
          0%   { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(25px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .td-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(20,0,0,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(139,0,0,0.35);
        }
        .td-nav-inner {
          max-width: 760px;
          margin: 0 auto;
          padding: 0.9rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-brand { display: flex; align-items: center; gap: 0.75rem; }
        .nav-logo {
          width: 34px; height: 34px;
          border-radius: 8px;
          background: rgba(139,0,0,0.5);
          border: 1px solid rgba(200,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem; color: #ff6b6b;
        }
        .nav-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem; font-weight: 600;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.02em;
        }
        .back-link {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .back-link:hover { color: rgba(255,255,255,0.8); }

        .td-wrap {
          position: relative; z-index: 1;
          max-width: 760px;
          margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
        }

        .page-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 10px; letter-spacing: 0.22em;
          text-transform: uppercase; color: #ff6b6b;
          margin-bottom: 0.4rem;
          animation: fadeUp 0.6s 0.1s both;
        }
        .page-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.2rem, 6vw, 3.5rem);
          line-height: 0.95; letter-spacing: 0.02em;
          background: linear-gradient(90deg, #ff4444, #ff0000, #cc0000, #ff4444);
          background-size: 400% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite, fadeUp 0.6s 0.15s both;
          margin-bottom: 0.3rem;
        }
        .page-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 300; font-size: 0.85rem;
          color: rgba(255,255,255,0.35);
          animation: fadeUp 0.6s 0.2s both;
        }
        .divider {
          width: 50px; height: 2px;
          background: linear-gradient(90deg, transparent, #cc0000, transparent);
          margin: 1rem 0 2rem;
          animation: fadeUp 0.6s 0.25s both;
        }

        .form-section {
          animation: fadeUp 0.6s 0.3s both;
          display: flex; flex-direction: column; gap: 2rem;
        }

        /* Section label */
        .section-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          display: block; margin-bottom: 0.75rem;
        }

        /* Name input */
        .field-input {
          width: 100%;
          background: rgba(80,0,0,0.2);
          border: 1px solid rgba(139,0,0,0.35);
          color: #fff;
          border-radius: 10px;
          padding: 0.8rem 1rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.2); }
        .field-input:focus {
          border-color: rgba(200,0,0,0.6);
          background: rgba(100,0,0,0.25);
        }

        /* Date cards */
        .date-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .date-card {
          background: rgba(80,0,0,0.2);
          border: 1px solid rgba(139,0,0,0.35);
          border-radius: 10px;
          padding: 1rem 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .date-card:hover {
          border-color: rgba(200,0,0,0.6);
          background: rgba(100,0,0,0.28);
          transform: translateY(-1px);
        }
        .date-card.selected {
          border-color: rgba(220,0,0,0.8);
          background: rgba(139,0,0,0.45);
          box-shadow: 0 4px 16px rgba(139,0,0,0.4);
        }
        .date-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.4rem;
        }
        .date-card.selected .date-title { color: #ff9999; }
        .date-weekday {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.2rem;
        }
        .date-full {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem; letter-spacing: 0.04em;
          color: #fff; line-height: 1;
        }
        .date-check {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem; font-weight: 600;
          color: #ff6b6b;
          margin-top: 0.5rem;
          letter-spacing: 0.06em;
        }

        /* Slot buttons */
        .slots-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.6rem;
        }
        .slots-grid-5 {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.6rem;
        }
        .slot-btn {
          background: rgba(80,0,0,0.2);
          border: 1px solid rgba(139,0,0,0.35);
          color: rgba(255,255,255,0.6);
          border-radius: 10px;
          padding: 0.7rem 0.4rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          line-height: 1.4;
        }
        .slot-btn:hover {
          border-color: rgba(200,0,0,0.6);
          background: rgba(100,0,0,0.28);
          color: #fff;
          transform: translateY(-1px);
        }
        .slot-btn.selected {
          border-color: rgba(220,0,0,0.8);
          background: rgba(139,0,0,0.45);
          color: #fff;
          box-shadow: 0 4px 14px rgba(139,0,0,0.4);
        }

        /* Lunch break */
        .lunch-box {
          background: rgba(60,30,0,0.3);
          border: 1px solid rgba(180,100,0,0.25);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          text-align: center;
        }
        .lunch-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          color: rgba(255,180,50,0.7);
          letter-spacing: 0.06em;
          margin-bottom: 0.15rem;
        }
        .lunch-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(255,180,50,0.4);
          letter-spacing: 0.04em;
        }

        /* WhatsApp notice */
        .wa-box {
          background: rgba(0,60,20,0.2);
          border: 1px solid rgba(0,150,60,0.25);
          border-radius: 10px;
          padding: 1rem 1.1rem;
        }
        .wa-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem; font-weight: 600;
          color: rgba(100,220,120,0.8);
          margin-bottom: 0.25rem;
          letter-spacing: 0.02em;
        }
        .wa-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem; font-weight: 300;
          color: rgba(100,220,120,0.45);
          line-height: 1.5;
        }

        /* Error */
        .field-error {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: #ff6b6b;
          margin-top: 0.4rem;
          letter-spacing: 0.04em;
        }

        /* Submit */
        .btn-submit {
          width: 100%;
          background: rgba(139,0,0,0.5);
          border: 1px solid rgba(200,0,0,0.55);
          color: #fff;
          border-radius: 10px;
          padding: 0.9rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-submit:hover:not(:disabled) {
          background: rgba(180,0,0,0.6);
          border-color: rgba(255,0,0,0.65);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(139,0,0,0.4);
        }
        .btn-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        @media (max-width: 600px) {
          .td-wrap { padding: 2rem 1rem 3rem; }
          .date-grid { grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; }
          .slots-grid-4 { grid-template-columns: 1fr 1fr; }
          .slots-grid-5 { grid-template-columns: 1fr 1fr; }
          .date-full { font-size: 1.1rem; }
        }
        @media (max-width: 400px) {
          .date-grid { grid-template-columns: 1fr; }
        }
      `}</style>

        <ParticleBackground />

        {/* Nav */}
        <header className="td-nav">
          <div className="td-nav-inner">
            <div className="nav-brand">
              <div className="nav-logo">E</div>
              <span className="nav-title">EcoWheels</span>
            </div>
            <Link href="/" className="back-link">← Back to Home</Link>
          </div>
        </header>

        <main className="td-wrap">
          <p className="page-eyebrow">EcoWheels Rourkela</p>
          <h1 className="page-title">Book a Test Ride</h1>
          <p className="page-subtitle">Pick a slot. We'll confirm on WhatsApp. Simple.</p>
          <div className="divider" />

          <div className="form-section">

            {/* Name */}
            <div>
              <label className="section-label">Your Name</label>
              <input
                  type="text"
                  placeholder="e.g. Rahul Kumar"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: "" }); }}
                  className="field-input"
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            {/* Dates */}
            <div>
              <label className="section-label">📅 Select Date</label>
              <div className="date-grid">
                {dates.map((date) => (
                    <button
                        key={date.value}
                        onClick={() => { setSelectedDate(date.value); setErrors({ ...errors, date: "" }); }}
                        className={`date-card${selectedDate === date.value ? " selected" : ""}`}
                    >
                      <p className="date-title">{date.title}</p>
                      <p className="date-weekday">{date.weekday}</p>
                      <p className="date-full">{date.fullDate}</p>
                      {selectedDate === date.value && <p className="date-check">✓ Selected</p>}
                    </button>
                ))}
              </div>
              {errors.date && <p className="field-error">{errors.date}</p>}
            </div>

            {/* Morning Slots */}
            <div>
              <label className="section-label">☀️ Morning Slots</label>
              <div className="slots-grid-4">
                {morningSlots.map((slot) => (
                    <button
                        key={slot}
                        onClick={() => { setSelectedSlot(slot); setErrors({ ...errors, slot: "" }); }}
                        className={`slot-btn${selectedSlot === slot ? " selected" : ""}`}
                    >
                      {slot}
                    </button>
                ))}
              </div>
            </div>

            {/* Lunch break */}
            <div className="lunch-box">
              <p className="lunch-title">🍽 Lunch Break</p>
              <p className="lunch-sub">2:00 PM – 3:00 PM · Unavailable</p>
            </div>

            {/* Evening Slots */}
            <div>
              <label className="section-label">🌆 Evening Slots</label>
              <div className="slots-grid-5">
                {eveningSlots.map((slot) => (
                    <button
                        key={slot}
                        onClick={() => { setSelectedSlot(slot); setErrors({ ...errors, slot: "" }); }}
                        className={`slot-btn${selectedSlot === slot ? " selected" : ""}`}
                    >
                      {slot}
                    </button>
                ))}
              </div>
              {errors.slot && <p className="field-error">{errors.slot}</p>}
            </div>

            {/* WhatsApp notice */}
            <div className="wa-box">
              <p className="wa-title">📱 Booking via WhatsApp</p>
              <p className="wa-sub">No phone number needed from you. We'll open WhatsApp with your details pre-filled and confirm from our end.</p>
            </div>

            {/* CTA */}
            <button onClick={handleBooking} disabled={loading} className="btn-submit">
              {loading ? "Opening WhatsApp..." : "⚡ Book My Test Ride"}
            </button>

          </div>
        </main>
      </div>
  );
}
