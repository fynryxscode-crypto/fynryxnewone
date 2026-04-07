// Lightweight route-level loading boundary — rendered by Next.js Suspense
// Keep this minimal: heavy animations hurt perceived performance during navigation
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#020617] flex items-center justify-center">
      {/* Simple progress bar — perceived speed trick */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-pulse" />
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
        <span className="text-blue-400/60 text-xs font-bold uppercase tracking-[0.4em]">Loading</span>
      </div>
    </div>
  );
}
