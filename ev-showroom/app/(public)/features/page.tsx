import ParticleBackground from "@/components/ParticleBackground";

const tiers = [
    {
        number: "01",
        tag: "Tier 1",
        title: "Must-Haves or You'll Regret It",
        subtitle: "Non-negotiable. Your future self will thank you.",
        emoji: "🛡️",
        color: "#ff4444",
        glow: "rgba(255,68,68,0.15)",
        border: "rgba(255,68,68,0.3)",
        features: [
            { icon: "🔧", name: "Low Maintenance", quip: "Because your mechanic shouldn't know your name by heart." },
            { icon: "🔌", name: "Auto-Cut Charger", quip: "Stops charging itself. Unlike you at 3am on your phone." },
            { icon: "💿", name: "Disc Brakes", quip: "For when the dog suddenly appears from nowhere." },
            { icon: "🛞", name: "Tubeless Tyres", quip: "Punctures? We don't do that here." },
        ],
    },
    {
        number: "02",
        tag: "Tier 2",
        title: "Practical Daily Drivers",
        subtitle: "The stuff that makes you wonder how you lived without it.",
        emoji: "⚡",
        color: "#ff6b35",
        glow: "rgba(255,107,53,0.12)",
        border: "rgba(255,107,53,0.28)",
        features: [
            { icon: "🎒", name: "Big Boot Space", quip: "Groceries, helmet, regrets — fits it all." },
            { icon: "🏪", name: "Our Own Service Centre", quip: "No more begging random mechanics to 'just have a look'." },
            { icon: "📋", name: "Non-RTO", quip: "Skip the queue. Skip the forms. Skip the existential dread." },
        ],
    },
    {
        number: "03",
        tag: "Tier 3",
        title: "Flex on Your Friends",
        subtitle: "Technically practical. Mostly bragging rights.",
        emoji: "😎",
        color: "#ff9f43",
        glow: "rgba(255,159,67,0.1)",
        border: "rgba(255,159,67,0.25)",
        features: [
            { icon: "🚨", name: "Anti-Theft Alarm", quip: "Wakes up the entire colony. Effective." },
            { icon: "📱", name: "Mobile Charging", quip: "Your phone dies less than your social life now." },
            { icon: "🏎️", name: "12-Inch Wheels", quip: "Bigger wheels, bigger personality. Science." },
        ],
    },
    {
        number: "04",
        tag: "Tier 4",
        title: "Pure Luxury & Showmanship",
        subtitle: "You don't need these. That's exactly why you want them.",
        emoji: "👑",
        color: "#ffd700",
        glow: "rgba(255,215,0,0.08)",
        border: "rgba(255,215,0,0.22)",
        features: [
            { icon: "🗝️", name: "Keyless Entry", quip: "Feel like a spy. Every. Single. Morning." },
            { icon: "💡", name: "DRL Lights", quip: "Day Running Lights. You glow even when you don't try." },
            { icon: "✈️", name: "Cruise Control", quip: "Set it. Sit back. Pretend you're in a music video." },
        ],
    },
];

export default function Features() {
    return (
        <div style={{ minHeight: "100vh", background: "#0d0000", color: "#fff", position: "relative", overflow: "hidden" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

                @keyframes shimmer {
                    0%   { background-position: -500px 0; }
                    100% { background-position: 500px 0; }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .feat-wrap {
                    position: relative;
                    z-index: 1;
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 4rem 1.5rem 5rem;
                }

                /* Hero heading */
                .feat-eyebrow {
                    font-family: 'Inter', sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: #ff6b6b;
                    margin-bottom: 0.5rem;
                    animation: fadeUp 0.5s 0.1s both;
                }
                .feat-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2.8rem, 8vw, 5rem);
                    line-height: 0.92;
                    letter-spacing: 0.02em;
                    background: linear-gradient(90deg, #ff4444, #ff0000, #cc0000, #ff4444);
                    background-size: 400% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 3s linear infinite, fadeUp 0.5s 0.15s both;
                    margin-bottom: 0.5rem;
                }
                .feat-subtitle {
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.3);
                    animation: fadeUp 0.5s 0.2s both;
                    margin-bottom: 0.5rem;
                }
                .feat-divider {
                    width: 50px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #cc0000, transparent);
                    margin: 1rem 0 3rem;
                    animation: fadeUp 0.5s 0.25s both;
                }

                /* Tier block */
                .tier-block {
                    margin-bottom: 3rem;
                    animation: fadeUp 0.6s both;
                }

                .tier-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 1.25rem;
                    margin-bottom: 1rem;
                }
                .tier-number {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 4rem;
                    line-height: 1;
                    letter-spacing: 0.04em;
                    opacity: 0.12;
                    flex-shrink: 0;
                    color: #fff;
                    user-select: none;
                }
                .tier-meta { padding-top: 0.2rem; }
                .tier-tag {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.65rem;
                    font-weight: 600;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    margin-bottom: 0.25rem;
                }
                .tier-name {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(1.6rem, 4vw, 2.2rem);
                    letter-spacing: 0.03em;
                    line-height: 1;
                    color: #fff;
                    margin-bottom: 0.3rem;
                }
                .tier-desc {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.78rem;
                    font-weight: 300;
                    color: rgba(255,255,255,0.3);
                    letter-spacing: 0.03em;
                }

                /* Feature cards grid */
                .feat-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 0.75rem;
                }

                .feat-card {
                    border-radius: 14px;
                    padding: 1.1rem 1.1rem 1rem;
                    transition: transform 0.2s, border-color 0.2s;
                    cursor: default;
                }
                .feat-card:hover {
                    transform: translateY(-2px);
                }

                .feat-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.6rem;
                    display: block;
                    line-height: 1;
                }
                .feat-name {
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 0.88rem;
                    color: rgba(255,255,255,0.88);
                    margin-bottom: 0.35rem;
                    letter-spacing: 0.01em;
                }
                .feat-quip {
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.3);
                    line-height: 1.5;
                    letter-spacing: 0.01em;
                }

                .tier-rule {
                    height: 1px;
                    background: linear-gradient(90deg, rgba(139,0,0,0.4), transparent);
                    margin: 2.5rem 0;
                }

                @media (max-width: 520px) {
                    .feat-wrap { padding: 3rem 1rem 4rem; }
                    .feat-grid { grid-template-columns: 1fr 1fr; }
                    .tier-number { font-size: 2.8rem; }
                }
                @media (max-width: 360px) {
                    .feat-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <ParticleBackground />

            <main className="feat-wrap">
                <p className="feat-eyebrow">What You're Getting</p>
                <h1 className="feat-title">Features</h1>
                <p className="feat-subtitle">Ranked by how much you'll regret ignoring them.</p>
                <div className="feat-divider" />

                {tiers.map((tier, ti) => (
                    <div key={tier.number}>
                        <div
                            className="tier-block"
                            style={{ animationDelay: `${0.3 + ti * 0.1}s` }}
                        >
                            {/* Tier header */}
                            <div className="tier-header">
                                <span className="tier-number">{tier.number}</span>
                                <div className="tier-meta">
                                    <p className="tier-tag" style={{ color: tier.color }}>{tier.emoji} {tier.tag}</p>
                                    <h2 className="tier-name">{tier.title}</h2>
                                    <p className="tier-desc">{tier.subtitle}</p>
                                </div>
                            </div>

                            {/* Feature cards */}
                            <div className="feat-grid">
                                {tier.features.map((f) => (
                                    <div
                                        key={f.name}
                                        className="feat-card"
                                        style={{
                                            background: tier.glow,
                                            border: `1px solid ${tier.border}`,
                                        }}
                                    >
                                        <span className="feat-icon">{f.icon}</span>
                                        <p className="feat-name">{f.name}</p>
                                        <p className="feat-quip">{f.quip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {ti < tiers.length - 1 && <div className="tier-rule" />}
                    </div>
                ))}
            </main>
        </div>
    );
}
