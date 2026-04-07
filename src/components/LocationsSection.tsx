export default function LocationsSection() {
  const locations = [
    'USA', 'UAE', 'Dubai', 'UK', 'Australia', 'Bangalore', 'Canada'
  ];

  return (
    <section className="py-20 bg-[#0a1f44] text-white overflow-hidden border-t border-slate-700/50">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold font-poppins mb-12 tracking-tight">
          Our Services Extend To These Top Locations!
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          {locations.map((loc) => (
             <div key={loc} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-semibold font-poppins text-sm cursor-pointer shadow-md">
                <span className="text-cyan-400">📍</span>
                {loc}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
