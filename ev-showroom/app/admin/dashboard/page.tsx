import AdminScooterCard from "@/components/AdminScooterCard";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import ParticleBackground from "@/components/ParticleBackground";

async function getScooters() {
    const res = await fetch("http://localhost:3000/api/scooters", {
        cache: "no-store",
    });
    return res.json();
}

export default async function Dashboard() {
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
                    from { opacity: 0; transform: translateY(25px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }

                .admin-nav {
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    background: rgba(20,0,0,0.85);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(139,0,0,0.35);
                }
                .admin-nav-inner {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0.9rem 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .nav-brand {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .nav-logo {
                    width: 34px;
                    height: 34px;
                    border-radius: 8px;
                    background: rgba(139,0,0,0.5);
                    border: 1px solid rgba(200,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1rem;
                    color: #ff6b6b;
                    letter-spacing: 0.05em;
                }
                .nav-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.85);
                    letter-spacing: 0.02em;
                }

                .admin-wrap {
                    position: relative;
                    z-index: 1;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 3rem 1.5rem 4rem;
                }

                .page-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                    animation: fadeUp 0.6s 0.1s both;
                }

                .page-eyebrow {
                    font-family: 'Inter', sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: #ff6b6b;
                    margin-bottom: 0.4rem;
                }
                .page-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(2.2rem, 6vw, 3.5rem);
                    line-height: 0.95;
                    letter-spacing: 0.02em;
                    background: linear-gradient(90deg, #ff4444, #ff0000, #cc0000, #ff4444);
                    background-size: 400% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 3s linear infinite;
                }
                .page-subtitle {
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.35);
                    letter-spacing: 0.02em;
                    margin-top: 0.3rem;
                }

                .btn-add {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.75rem 1.5rem;
                    background: rgba(139,0,0,0.4);
                    border: 1px solid rgba(200,0,0,0.5);
                    color: #fff;
                    border-radius: 10px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 0.82rem;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: all 0.25s;
                    white-space: nowrap;
                }
                .btn-add:hover {
                    background: rgba(180,0,0,0.5);
                    border-color: rgba(255,0,0,0.6);
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(139,0,0,0.4);
                }

                .stat-card {
                    display: inline-block;
                    background: rgba(100,0,0,0.15);
                    border: 1px solid rgba(139,0,0,0.35);
                    border-radius: 14px;
                    padding: 1.25rem 2rem;
                    margin-bottom: 2rem;
                    animation: fadeUp 0.6s 0.25s both;
                }
                .stat-label {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.65rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.3);
                    margin-bottom: 0.35rem;
                }
                .stat-value {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 2.8rem;
                    color: #ff4444;
                    line-height: 1;
                    letter-spacing: 0.04em;
                }

                .divider {
                    width: 50px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #cc0000, transparent);
                    margin-bottom: 2rem;
                    animation: fadeUp 0.6s 0.2s both;
                }

                .list-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    animation: fadeIn 0.7s 0.4s both;
                }

                .empty-box {
                    background: rgba(100,0,0,0.12);
                    border: 1px solid rgba(139,0,0,0.3);
                    border-radius: 16px;
                    padding: 5rem 1rem;
                    text-align: center;
                    animation: fadeUp 0.6s 0.3s both;
                }
                .empty-text {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.25);
                    letter-spacing: 0.05em;
                    margin-bottom: 0.75rem;
                }
                .empty-link {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: #ff6b6b;
                    text-decoration: underline;
                    text-underline-offset: 3px;
                }

                @media (max-width: 560px) {
                    .admin-wrap { padding: 2rem 1rem 3rem; }
                    .page-header { flex-direction: column; align-items: flex-start; }
                    .btn-add { width: 100%; justify-content: center; }
                }
            `}</style>

            <ParticleBackground />

            {/* Nav */}
            <header className="admin-nav">
                <div className="admin-nav-inner">
                    <div className="nav-brand">
                        <div className="nav-logo">A</div>
                        <span className="nav-title">Admin Console</span>
                    </div>
                    <LogoutButton />
                </div>
            </header>

            <main className="admin-wrap">
                {/* Header */}
                <div className="page-header">
                    <div>
                        <p className="page-eyebrow">Fleet Management</p>
                        <h1 className="page-title">Dashboard</h1>
                        <p className="page-subtitle">View and manage your scooters</p>
                    </div>
                    <Link href="/admin/add-scooter" className="btn-add">
                        <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>+</span>
                        Add Scooter
                    </Link>
                </div>

                <div className="divider" />

                {/* Stat */}
                <div className="stat-card">
                    <p className="stat-label">Total Scooters</p>
                    <p className="stat-value">{scooters.length}</p>
                </div>

                {/* List */}
                {scooters.length === 0 ? (
                    <div className="empty-box">
                        <p className="empty-text">No scooters yet.</p>
                        <Link href="/admin/add-scooter" className="empty-link">
                            Add your first one
                        </Link>
                    </div>
                ) : (
                    <div className="list-wrap">
                        {scooters.map((scooter: any) => (
                            <AdminScooterCard key={scooter._id} scooter={scooter} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}