"use client";

import { useRouter } from "next/navigation";

type Scooter = {
    _id: string;
    name: string;
    price: number;
    range: number;
    topSpeed: number;
    images: string[];
};

export default function ScooterCard({ scooter }: { scooter: Scooter }) {
    const router = useRouter();

    const handleClick = () => {
        if ("startViewTransition" in document) {
            // @ts-ignore
            document.startViewTransition(() => {
                router.push(`/scooters/${scooter._id}`);
            });
        } else {
            router.push(`/scooters/${scooter._id}`);
        }
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600&display=swap');

        .scooter-card {
          background: rgba(80,0,0,0.15);
          border: 1px solid rgba(139,0,0,0.35);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }
        .scooter-card:hover {
          border-color: rgba(200,0,0,0.65);
          background: rgba(100,0,0,0.25);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(139,0,0,0.3);
        }
        .scooter-card:active {
          transform: scale(0.97);
          opacity: 0.9;
            }
.card-img-wrap {
  width: 100%;
  height: auto;
  max-height: 280px;       /* 👈 cap so very tall photos don't dominate the grid */
  overflow: hidden;
  background: rgba(60,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-img-wrap img {
  width: 100%;
  height: auto;
  max-height: 280px;
  object-fit: contain;     /* 👈 changed from cover */
  transition: transform 0.4s ease;
}
        .scooter-card:hover .card-img-wrap img {
          transform: scale(1.06);
        }

        .card-body {
          padding: 1.1rem 1.1rem 1.2rem;
        }

        .card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.03em;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .card-price {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.04em;
          background: linear-gradient(90deg, #ff4444, #ff0000, #cc0000, #ff4444);
          background-size: 400% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
          margin-bottom: 1rem;
          display: block;
        }

        .card-specs {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-top: 1px solid rgba(139,0,0,0.3);
          padding-top: 0.9rem;
        }

        .spec-divider {
          width: 1px;
          height: 28px;
          background: rgba(139,0,0,0.4);
        }

        .spec-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 0.2rem;
        }

        .spec-value {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
        }

        @keyframes shimmer {
          0%   { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
      `}</style>

            <div className="scooter-card" onClick={handleClick}>
                {/* Image */}
                <div className="card-img-wrap">
                    <img src={scooter.images?.[0]} alt={scooter.name} />
                </div>

                {/* Content */}
                <div className="card-body">
                    <h2 className="card-name">{scooter.name}</h2>
                    <span className="card-price">
            ₹{scooter.price.toLocaleString("en-IN")}
          </span>

                    {/* Specs */}
                    <div className="card-specs">
                        <div>
                            <p className="spec-label">Range</p>
                            <p className="spec-value">{scooter.range} km</p>
                        </div>
                        <div className="spec-divider" />
                        <div>
                            <p className="spec-label">Top Speed</p>
                            <p className="spec-value">{scooter.topSpeed} km/h</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}