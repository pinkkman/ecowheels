"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let animId: number;

        const particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.8 + 0.2,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            o: Math.random() * 0.6 + 0.1,
        }));

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        function draw() {
            const W = canvas.width, H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = "#0d0000";
            ctx.fillRect(0, 0, W, H);
            const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.75);
            grad.addColorStop(0, "rgba(120,0,0,0.3)");
            grad.addColorStop(1, "transparent");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);
            particles.forEach((p) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,80,80,${p.o})`;
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        }
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    useEffect(() => {
        function countUp(id: string, target: number, suffix: string) {
            const el = document.getElementById(id);
            if (!el) return;
            let val = 0;
            const step = target / 60;
            const interval = setInterval(() => {
                val += step;
                if (val >= target) { val = target; clearInterval(interval); }
                el.textContent = Math.floor(val) + suffix;
            }, 1500 / 60);
        }
        const t = setTimeout(() => {
            countUp("stat-riders", 200, "+");
            countUp("stat-range", 150, "km");
        }, 1000);
        return () => clearTimeout(t);
    }, []);

    return (
        <main style={{ background: "#0d0000", minHeight: "100vh", color: "#fff", overflow: "hidden", position: "relative" }}>

            <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />

            {/* Glow rings */}
            <div style={{ position: "fixed", top: "50%", left: "50%", zIndex: 0, pointerEvents: "none" }}>
                {[400, 650, 900].map((size, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        width: size, height: size,
                        borderRadius: "50%",
                        border: "1px solid rgba(139,0,0,0.2)",
                        top: "50%", left: "50%",
                        transform: "translate(-50%,-50%)",
                        animation: `pulse 4s ${i * 1.2}s ease-in-out infinite`,
                        opacity: 1 - i * 0.28,
                    }} />
                ))}
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity: 0.25; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 0.6;  transform: translate(-50%,-50%) scale(1.05); }
        }
   @keyframes shimmer {
  from {
    background-position: -150% 0;
  }
  to {
    background-position: 150% 0;
  }
}
        /* Line 1: drops in from top */
        @keyframes dropIn {
          0%   { opacity: 0; transform: translateY(-60px); }
          60%  { opacity: 1; transform: translateY(8px); }
          80%  { transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Line 2: slides up from below */
        @keyframes riseIn {
          0%   { opacity: 0; transform: translateY(50px); }
          60%  { opacity: 1; transform: translateY(-6px); }
          80%  { transform: translateY(3px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Red line glow pulse — no shimmer, pure CSS, no GPU hit */
        @keyframes redGlow {
          0%, 100% { color: #ff2222; text-shadow: 0 0 12px rgba(255,40,40,0.5); }
          50%       { color: #ff6666; text-shadow: 0 0 22px rgba(255,80,80,0.75); }
        }

        * { box-sizing: border-box; }

        .hero-wrap {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 1.25rem 3rem;
        }

        .eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #ff6b6b;
          margin-bottom: 1.25rem;
          animation: fadeUp 0.7s 0.1s both;
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.2rem, 14vw, 9rem);
          line-height: 0.95;
          letter-spacing: 0.02em;
          word-break: break-word;
        }

        .title-line1 {
          display: block;
          opacity: 0;
          animation: dropIn 0.65s 0.2s cubic-bezier(0.33, 1, 0.68, 1) forwards;
        }
.title-line2 {
  display: block;
  opacity: 0;
  position: relative;

  background: linear-gradient(
    90deg,
    #cc0000 0%,
    #ff0000 35%,
    #ffffff 50%,   /* reflection */
    #ff0000 65%,
    #cc0000 100%
  );

  background-size: 250% 100%;
  background-position: -150% 0;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  animation:
    riseIn 0.65s 0.45s cubic-bezier(0.33, 1, 0.68, 1) forwards,
    shimmer 4s 1s linear infinite;
}

        .divider {
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #cc0000, transparent);
          margin: 1.25rem auto 0;
          animation: fadeUp 0.8s 0.6s both;
        }

        .subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: clamp(0.9rem, 3.5vw, 1.1rem);
          color: rgba(255,255,255,0.5);
          line-height: 1.8;
          max-width: 460px;
          width: 100%;
          margin: 1.25rem auto 2.25rem;
          animation: fadeUp 0.8s 0.7s both;
          letter-spacing: 0.02em;
          padding: 0 0.5rem;
        }

        .cta-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.8s 0.9s both;
          width: 100%;
          max-width: 420px;
        }

        .btn-primary {
          flex: 1;
          min-width: 130px;
          padding: 0.85rem 1.25rem;
          background: #8b0000;
          color: #fff;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .btn-primary:hover {
          background: #aa0000;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(139,0,0,0.6);
        }

        .btn-ghost {
          flex: 1;
          min-width: 130px;
          padding: 0.85rem 1.25rem;
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.35);
          color: #fff;
          transform: translateY(-2px);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          width: 100%;
          max-width: 680px;
          margin-top: 4rem;
          animation: fadeUp 0.8s 1.1s both;
        }

        @media (max-width: 480px) {
          .stats {
            grid-template-columns: 1fr;
            max-width: 320px;
            gap: 0.65rem;
            margin-top: 3rem;
          }
          .cta-row {
            flex-direction: column;
            max-width: 300px;
          }
          .btn-primary, .btn-ghost {
            width: 100%;
            min-width: unset;
          }
        }

        .stat-card {
          background: rgba(100,0,0,0.15);
          border: 1px solid rgba(139,0,0,0.35);
          border-radius: 14px;
          padding: 1.25rem 0.75rem;
          text-align: center;
          transition: transform 0.3s, border-color 0.3s, background 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(200,0,0,0.7);
          background: rgba(139,0,0,0.25);
        }
        .stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 6vw, 2.8rem);
          color: #ff4444;
          display: block;
          line-height: 1;
          margin-bottom: 0.35rem;
          letter-spacing: 0.04em;
        }
        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.62rem, 2vw, 0.72rem);
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>

            <div className="hero-wrap">
                <div className="eyebrow">Rourkela&apos;s #1 Electric Scooter Showroom</div>

                <h1 className="hero-title">
                    <span className="title-line1">Ride The Future</span>
                    <span className="title-line2">With Eco Wheels</span>
                </h1>

                <div className="divider" />

                <p className="subtitle">
                    Zero fuel. Zero limits. Pure adrenaline. <br/>
                    Engineered for tomorrow, Available today.
                </p>

                <div className="cta-row"
                     style={{
                         display: "flex",
                         gap: "30px",
                         flexWrap: "wrap",
                     }}>
                    <Link href="/scooters" className="btn-primary">Explore Scooters</Link>
                    <Link href="/features" className="btn-primary">Explore Features</Link>
                </div>

                <div className="stats">
                    <div className="stat-card">
                        <span id="stat-riders" className="stat-num">200+</span>
                        <span className="stat-label">Happy Riders</span>
                    </div>
                    <div className="stat-card">
                        <span id="stat-range" className="stat-num">150km</span>
                        <span className="stat-label">Range Per Charge</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-num">Li-Ion</span>
                        <span className="stat-label">Advanced Battery</span>
                    </div>
                </div>

            </div>
        </main>
    );
}
