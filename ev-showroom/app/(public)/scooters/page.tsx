import ScooterCard from "@/components/ScooterCard";
import ParticleBackground from "@/components/ParticleBackground";

async function getScooters() {
    const res = await fetch("http://localhost:3000/api/scooters", {
        cache: "no-store",
    });
    return res.json();
}

export default async function ScootersPage() {
    const data = await getScooters();
    const scooters = data.scooters;

    return (
        <div style={{ minHeight: "100vh", background: "#0d0000", color: "#fff", position: "relative", overflow: "hidden" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600&display=swap');

                @keyframes shimmer {
                    0%   { background-position: -500px 0; }
                    100% { background-position: 500px 0; }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(35px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
              
             
                .scooters-wrap {
                    position: relative;
                    z-index: 1;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 4rem 1.5rem 2rem;
                }

                .page-eyebrow {
                    font-family: 'Inter', sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: #ff6b6b;
                    margin-bottom: 0.75rem;
                    animation: fadeUp 0.7s 0.1s both;
                }

                .page-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2.8rem, 9vw, 6rem);
                    line-height: 0.95;
                    letter-spacing: 0.02em;
                    background: linear-gradient(90deg, #ff4444, #ff0000, #cc0000, #ff4444);
                    background-size: 400% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 3s linear infinite, fadeUp 0.7s 0.2s both;
                    margin-bottom: 0.75rem;
                }

                .page-subtitle {
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    font-size: clamp(0.9rem, 3vw, 1.05rem);
                    color: rgba(255,255,255,0.45);
                    letter-spacing: 0.02em;
                    animation: fadeUp 0.7s 0.35s both;
                }

                .divider {
                    width: 50px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #cc0000, transparent);
                    margin: 1.25rem 0 2.5rem;
                    animation: fadeUp 0.7s 0.4s both;
                }

                .scooter-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.25rem;
                    animation: fadeIn 0.8s 0.55s both;
                }

                @media (max-width: 900px) {
                    .scooter-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 560px) {
                    .scooter-grid { grid-template-columns: 1fr; }
                    .scooters-wrap { padding: 3rem 1rem 2rem; }
                }

                .empty-state {
                    text-align: center;
                    padding: 6rem 1rem;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.25);
                    letter-spacing: 0.05em;
                    animation: fadeUp 0.7s 0.5s both;
                }

                .page-footer {
                    position: relative;
                    z-index: 1;
                    border-top: 1px solid rgba(139,0,0,0.3);
                    margin-top: 5rem;
                }
                .page-footer-inner {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                .footer-text {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.72rem;
                    color: rgba(255,255,255,0.2);
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
            `}</style>

            {/* Particle canvas */}
            <ParticleBackground />


            <main className="scooters-wrap">

                <h1 className="page-title">Our Scooters</h1>
                <p className="page-subtitle">Find the perfect ride for your commute.</p>
                <div className="divider" />

                {scooters.length === 0 ? (
                    <div className="empty-state">
                        No scooters available right now. Check back soon.
                    </div>
                ) : (
                    <div className="scooter-grid">
                        {scooters.map((scooter: any) => (
                            <ScooterCard key={scooter._id} scooter={scooter} />
                        ))}
                    </div>
                )}
            </main>

            <footer className="page-footer">
                <div className="page-footer-inner">
                    <p className="footer-text">© {new Date().getFullYear()} EcoWheels Rourkela</p>
                    <p className="footer-text">Ride Responsibly</p>
                </div>
            </footer>
        </div>
    );
}