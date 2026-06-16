"use client";

import { useState } from "react";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

export default function AddScooterPage() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        range: "",
        topSpeed: "",
        battery: "",
        description: "",
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.target.files || []);

        if (files.length > 3) {
            alert("Maximum 3 images allowed.");
            return;
        }

        setImageFiles(files);

        setPreviews(
            files.map((file) =>
                URL.createObjectURL(file)
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const imageUrls: string[] = [];

            for (const file of imageFiles) {
                const uploadFormData = new FormData();

                uploadFormData.append("file", file);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadFormData,
                });

                const uploadData = await uploadRes.json();

                imageUrls.push(uploadData.url);
            }
            const res = await fetch("/api/scooters", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    price: Number(form.price),
                    range: Number(form.range),
                    topSpeed: Number(form.topSpeed),
                    battery: form.battery,
                    description: form.description,
                    images: imageUrls,
                }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Scooter added successfully!");
                setForm({ name: "", price: "", range: "", topSpeed: "", battery: "", description: "" });
                setImageFiles([]);
                setPreviews([]);
            } else {
                alert("Failed to add scooter.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
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

                .admin-nav {
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    background: rgba(20,0,0,0.85);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(139,0,0,0.35);
                }
                .admin-nav-inner {
                    max-width: 720px;
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
                }
                .nav-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.95rem;
                    font-weight: 600;
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

                .form-wrap {
                    position: relative;
                    z-index: 1;
                    max-width: 720px;
                    margin: 0 auto;
                    padding: 3rem 1.5rem 4rem;
                }

                .page-eyebrow {
                    font-family: 'Inter', sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: #ff6b6b;
                    margin-bottom: 0.4rem;
                    animation: fadeUp 0.6s 0.1s both;
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
                    animation: shimmer 3s linear infinite, fadeUp 0.6s 0.15s both;
                    margin-bottom: 0.3rem;
                }
                .page-subtitle {
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.35);
                    animation: fadeUp 0.6s 0.2s both;
                }
                .divider {
                    width: 50px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #cc0000, transparent);
                    margin: 1rem 0 2rem;
                    animation: fadeUp 0.6s 0.25s both;
                }

                .form-section {
                    animation: fadeUp 0.6s 0.3s both;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .field-label {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.65rem;
                    font-weight: 600;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: ;
                    display: block;
                    margin-bottom: 0.5rem;
                }
.eco-swiper {
    border-radius: 20px;
    overflow: hidden;
}

.eco-swiper .swiper-pagination {
    bottom: 12px !important;
}

.eco-swiper .swiper-pagination-bullet {
    background: rgba(255,255,255,0.35);
    opacity: 1;
}

.eco-swiper .swiper-pagination-bullet-active {
    background: #ff4444;
}
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

                .field-textarea {
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
                    resize: none;
                    height: 110px;
                    box-sizing: border-box;
                }
                .field-textarea::placeholder { color: rgba(255,255,255,0.2); }
                .field-textarea:focus {
                    border-color: rgba(200,0,0,0.6);
                    background: rgba(100,0,0,0.25);
                }

                .two-col {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }
                @media (max-width: 500px) {
                    .two-col { grid-template-columns: 1fr; }
                    .form-wrap { padding: 2rem 1rem 3rem; }
                }

                .upload-zone {
                    width: 100%;
                    height: 140px;
                    border: 1.5px dashed rgba(139,0,0,0.45);
                    border-radius: 12px;
                    background: rgba(80,0,0,0.15);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    overflow: hidden;
                    transition: border-color 0.25s, background 0.25s;
                }
                .upload-zone:hover {
                    border-color: rgba(200,0,0,0.65);
                    background: rgba(100,0,0,0.25);
                }
                .upload-hint {
                    text-align: center;
                }
                .upload-hint p {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.82rem;
                    color: rgba(255,255,255,0.3);
                }
                .upload-hint span {
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.18);
                    letter-spacing: 0.06em;
                    margin-top: 0.25rem;
                    display: block;
                }

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
                .btn-submit:disabled {
                    opacity: 0.45;
                    cursor: not-allowed;
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
                    <Link href="/admin/dashboard" className="back-link">
                        ← Back to Dashboard
                    </Link>
                </div>
            </header>

            <main className="form-wrap">
                <p className="page-eyebrow">Fleet Management</p>
                <h1 className="page-title">Add Scooter</h1>
                <p className="page-subtitle">Fill in the details to list a new scooter.</p>
                <div className="divider" />

                <form onSubmit={handleSubmit} className="form-section">
                    {/* Name */}
                    <div>
                        <label className="field-label">Scooter Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Ather 450X"
                            value={form.name}
                            onChange={handleChange}
                            className="field-input"
                            required
                        />
                    </div>

                    {/* Price + Battery */}
                    <div className="two-col">
                        <div>
                            <label className="field-label">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="e.g. 150000"
                                value={form.price}
                                onChange={handleChange}
                                className="field-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="field-label">Battery Type</label>
                            <input
                                type="text"
                                name="battery"
                                placeholder="e.g. Li-ion 3.7kWh"
                                value={form.battery}
                                onChange={handleChange}
                                className="field-input"
                                required
                            />
                        </div>
                    </div>

                    {/* Range + Top Speed */}
                    <div className="two-col">
                        <div>
                            <label className="field-label">Range (km)</label>
                            <input
                                type="number"
                                name="range"
                                placeholder="e.g. 85"
                                value={form.range}
                                onChange={handleChange}
                                className="field-input"
                                required
                            />
                        </div>
                        <div>
                            <label className="field-label">Top Speed (km/h)</label>
                            <input
                                type="number"
                                name="topSpeed"
                                placeholder="e.g. 90"
                                value={form.topSpeed}
                                onChange={handleChange}
                                className="field-input"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="field-label">Description</label>
                        <textarea
                            name="description"
                            placeholder="Briefly describe the scooter..."
                            value={form.description}
                            onChange={handleChange}
                            className="field-textarea"
                            required
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="field-label">Image</label>
                        <label className="upload-zone">
                            {previews.length > 0 ? (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "10px",
                                        width: "100%",
                                        padding: "10px",
                                    }}
                                >
                                    {previews.map((preview, index) => (
                                        <img
                                            key={index}
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            style={{
                                                width: "100%",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="upload-hint">
                                    <p>Click to upload image</p>
                                    <span>PNG, JPG, WEBP</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: "none" }} />
                        </label>
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={loading} className="btn-submit">
                        {loading ? "Adding..." : "Add Scooter"}
                    </button>
                </form>
            </main>
        </div>
    );
}