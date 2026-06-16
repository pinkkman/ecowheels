"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminScooterCard({
                                             scooter,
                                         }: {
    scooter: any;
}) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm(`Delete ${scooter.name}?`);
        if (!confirmed) return;

        const res = await fetch(`/api/scooters/${scooter._id}`, {
            method: "DELETE",
        });

        const data = await res.json();
        if (data.success) {
            router.refresh();
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

                .sc-card {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    background: rgba(80,0,0,0.18);
                    border: 1px solid rgba(139,0,0,0.3);
                    border-radius: 14px;
                    padding: 1.1rem 1.4rem;
                    transition: border-color 0.2s, background 0.2s;
                }
                .sc-card:hover {
                    border-color: rgba(180,0,0,0.5);
                    background: rgba(100,0,0,0.22);
                }

                .sc-info { min-width: 0; flex: 1; }

                .sc-name {
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.88);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    letter-spacing: 0.01em;
                }
                .sc-price {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.78rem;
                    color: rgba(255,255,255,0.3);
                    margin-top: 0.2rem;
                    letter-spacing: 0.04em;
                }

                .sc-actions {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex-shrink: 0;
                }

                .btn-edit {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    padding: 0.5rem 1.1rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.12);
                    color: rgba(255,255,255,0.7);
                    border-radius: 8px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 0.75rem;
                    letter-spacing: 0.07em;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .btn-edit:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.28);
                    color: #fff;
                    transform: translateY(-1px);
                }

                .btn-delete {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    padding: 0.5rem 1.1rem;
                    background: rgba(139,0,0,0.3);
                    border: 1px solid rgba(200,0,0,0.4);
                    color: #ff6b6b;
                    border-radius: 8px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 0.75rem;
                    letter-spacing: 0.07em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .btn-delete:hover {
                    background: rgba(180,0,0,0.45);
                    border-color: rgba(255,0,0,0.6);
                    color: #ff4444;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 14px rgba(139,0,0,0.4);
                }

                @media (max-width: 520px) {
                    .sc-card {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.85rem;
                        padding: 1rem;
                    }
                    .sc-actions { width: 100%; }
                    .btn-edit, .btn-delete {
                        flex: 1;
                        justify-content: center;
                        padding: 0.65rem 0.5rem;
                    }
                }
            `}</style>

            <div className="sc-card">
                <div className="sc-info">
                    <p className="sc-name">{scooter.name}</p>
                    <p className="sc-price">₹{Number(scooter.price).toLocaleString("en-IN")}</p>
                </div>

                <div className="sc-actions">
                    <Link href={`/admin/edit/${scooter._id}`} className="btn-edit">
                        Edit
                    </Link>
                    <button onClick={handleDelete} className="btn-delete">
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
}
