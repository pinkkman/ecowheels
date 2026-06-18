import WhatsAppEnquiryButton from "@/components/whatsAppEnquiryButton";
import ParticleBackground from "@/components/ParticleBackground";
import {showroom} from "@/data/showroom";

import { connectDB } from "@/lib/db";
import Scooter from "@/models/Scooter";

async function getScooter(id: string) {
    console.log("Searching ID:", id);

    await connectDB();

    const scooter = await Scooter.findById(id).lean();

    console.log("Found:", scooter);

    if (!scooter) {
        return null;
    }

    return JSON.parse(JSON.stringify(scooter));
}
export default async function ScooterDetails({
                                                 params,
                                             }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const scooter = await getScooter(id);

    return (
        <div style={{ minHeight: "100vh", background: "#0d0000", color: "#fff", position: "relative", overflow: "hidden" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600&display=swap');

                .detail-wrap {
                    position: relative;
                    z-index: 1;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 3.5rem 1.5rem 4rem;
                }

                .top-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                    align-items: start;
                }

                @media (max-width: 800px) {
                    .top-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .specs-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                    .scooter-name {
                        font-size: clamp(2.5rem, 10vw, 4rem) !important;
                    }
                    .detail-wrap {
                        padding: 2.5rem 1rem 3rem;
                    }
                }

                .image-carousel {
                    display: flex;
                    gap: 12px;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    padding-bottom: 8px;
                }
                .image-carousel::-webkit-scrollbar { display: none; }

                .carousel-image {
                    flex: 0 0 90%;
                    width: 90%;
                    aspect-ratio: 4/3;
                    object-fit: cover;
                    border-radius: 20px;
                    border: 1px solid rgba(139,0,0,0.4);
                    scroll-snap-align: center;
                    background: rgba(100,0,0,0.15);
                }

                .swipe-hint {
                    margin-top: 12px;
                    text-align: center;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    letter-spacing: 0.08em;
                    color: rgba(255,255,255,0.4);
                    animation: swipeHint 1.8s ease-in-out infinite;
                }
                @keyframes swipeHint {
                    0%, 100% { transform: translateX(0); opacity: 0.4; }
                    50%       { transform: translateX(-8px); opacity: 0.8; }
                }

                @media (max-width: 480px) {
                    .specs-grid { grid-template-columns: 1fr !important; }
                    .btn-row { flex-direction: column; }
                    .btn-row a, .btn-row > * {
                        width: 100%;
                        text-align: center;
                        justify-content: center;
                    }
                }

                .scooter-image {
                    width: 100%;
                    aspect-ratio: 4/3;
                    object-fit: cover;
                    border-radius: 20px;
                    border: 1px solid rgba(139,0,0,0.4);
                    display: block;
                }

                .featured-badge {
                    display: inline-block;
                    margin-bottom: 1rem;
                    background: rgba(139,0,0,0.4);
                    border: 1px solid rgba(200,0,0,0.5);
                    color: #ff6b6b;
                    padding: 0.3rem 1rem;
                    border-radius: 999px;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                .scooter-name {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(3rem, 7vw, 5rem);
                    line-height: 0.95;
                    letter-spacing: 0.02em;
                    margin-bottom: 0.75rem;
                }

                .scooter-price {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2rem, 5vw, 3rem);
                    letter-spacing: 0.04em;
                    background: linear-gradient(90deg, #ff4444, #ff0000, #cc0000, #ff4444);
                    background-size: 400% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 3s linear infinite;
                    margin-bottom: 2rem;
                    display: block;
                }

                .divider {
                    width: 50px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #cc0000, transparent);
                    margin: 0.75rem 0 1.5rem;
                }

                .specs-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }

                .spec-card {
                    background: rgba(100,0,0,0.15);
                    border: 1px solid rgba(139,0,0,0.35);
                    border-radius: 14px;
                    padding: 1.1rem 1rem;
                    transition: border-color 0.3s, background 0.3s;
                }
                .spec-card:hover {
                    border-color: rgba(200,0,0,0.6);
                    background: rgba(139,0,0,0.25);
                }
                .spec-label {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.7rem;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.35);
                    margin-bottom: 0.4rem;
                }
                .spec-value {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.8rem;
                    letter-spacing: 0.04em;
                    color: #fff;
                    line-height: 1;
                }

                .btn-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .btn-test {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.85rem 1.75rem;
                    background: rgba(100,0,0,0.2);
                    border: 1px solid rgba(139,0,0,0.4);
                    color: rgba(255,255,255,0.8);
                    border-radius: 10px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 0.82rem;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: all 0.3s;
                }
                .btn-test:hover {
                    background: rgba(139,0,0,0.35);
                    border-color: rgba(200,0,0,0.6);
                    color: #fff;
                    transform: translateY(-2px);
                }

                .about-box {
                    margin-top: 3.5rem;
                    background: rgba(100,0,0,0.12);
                    border: 1px solid rgba(139,0,0,0.3);
                    border-radius: 20px;
                    padding: 2.5rem;
                }
                .about-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(1.8rem, 5vw, 2.5rem);
                    letter-spacing: 0.04em;
                    margin-bottom: 1rem;
                }
                .about-text {
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                    color: rgba(255,255,255,0.55);
                    line-height: 1.9;
                    letter-spacing: 0.01em;
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

                @keyframes shimmer {
                    0%   { background-position: -500px 0; }
                    100% { background-position: 500px 0; }
                }
            `}</style>

            <ParticleBackground />

            <main className="detail-wrap">
                <div className="top-grid">
                    {/* Image */}
                    <div>
                        <div className="image-carousel">
                            {scooter.images
                                ?.filter(Boolean)
                                .map((image: string, index: number) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${scooter.name} ${index + 1}`}
                                        className="carousel-image"
                                    />
                                ))}
                        </div>
                        {scooter.images?.filter(Boolean).length > 1 && (
                            <p className="swipe-hint">← Swipe to view more →</p>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        {scooter.featured && (
                            <span className="featured-badge">⭐ Featured Scooter</span>
                        )}

                        <h1 className="scooter-name">{scooter.name}</h1>
                        <div className="divider" />
                        <span className="scooter-price">
                            ₹{scooter.price.toLocaleString("en-IN")}
                        </span>

                        {/* Specs */}
                        <div className="specs-grid">
                            {[
                                { label: "Range", value: `${scooter.range} km` },
                                { label: "Top Speed", value: `${scooter.topSpeed} km/h` },
                                { label: "Battery", value: scooter.battery },
                                { label: "Charging Time", value: showroom.chargingTime },
                                { label: "Warranty", value: showroom.warranty || "N/A" },
                            ].map(({ label, value }) => (
                                <div key={label} className="spec-card">
                                    <p className="spec-label">{label}</p>
                                    <p className="spec-value">{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="btn-row">
                            <WhatsAppEnquiryButton scooterName={scooter.name} />
                            <a href="/book-a-test-drive" className="btn-test">
                                📅 Book Test Drive
                            </a>
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="about-box">
                    <h2 className="about-title">About This Scooter</h2>
                    <p className="about-text">
                        {scooter.description || "No description available."}
                    </p>
                </div>
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
