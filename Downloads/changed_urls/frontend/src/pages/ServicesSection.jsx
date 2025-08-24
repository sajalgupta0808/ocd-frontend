
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServicesSection({
  columns = 4,
  cardHeight = '26rem',
  cardWidth = undefined
}) {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch('https://ocd-deploy.onrender.com/services') // 🔹 your API endpoint
      fetch(`${import.meta.env.VITE_API_BASE}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const gridStyle = { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` };

  // 🔹 Loader UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-black">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-4 text-gray-300 text-lg">Loading services...</span>
      </div>
    );
  }

  // 🔹 Error UI
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-black">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <section className="relative z-30 pt-16">
      <div className="text-center py-16 px-8">
        <h1 className="font-bebas text-6xl pt-28 text-app-white">
          Where Precision Isn't a Feature
          <span className="text-custom-red"> It's the Standard </span>
        </h1>
        <h3 className="mt-4 text-lg text-gray-300">
          Every surface. Every curve. Every ride. We treat your machine like a masterpiece.
        </h3>

        <div className="mt-16 grid gap-8" style={gridStyle}>
          {services.map((s) => (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/toolbar/${s.id}`)} // 🔹 Pass ID in URL
              onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/toolbar/${s.id}`); }}
              className="relative group cursor-pointer overflow-hidden rounded-md"
              style={{ height: cardHeight, maxWidth: cardWidth }}
              aria-label={s.name}
            >
              <img
                src={s.image_home}
                alt={s.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90"></div>

              {/* Default title */}
              <div className="absolute left-6 bottom-6 z-20 pointer-events-none transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                <h3 className="font-bebas text-[2.6rem] leading-none tracking-tighter text-white drop-shadow-lg uppercase">
                  {s.name}
                </h3>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 z-30 flex items-end p-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                <div className="max-w-[60%]">
                  <h2 className="font-bebas text-[3.4rem] leading-tight text-white mb-3 drop-shadow-lg uppercase">
                    {s.name}
                  </h2>
                  <p className="text-white text-lg mb-6">
                    {s.description}
                  </p>
                  <div className="text-white text-3xl">→</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
