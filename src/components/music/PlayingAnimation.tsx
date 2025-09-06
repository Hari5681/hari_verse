export default function PlayingAnimation() {
  return (
    <div className="flex items-end gap-1 h-5">
      <span className="w-1 h-2 bg-green-400 animate-bar1"></span>
      <span className="w-1 h-4 bg-green-400 animate-bar2"></span>
      <span className="w-1 h-3 bg-green-400 animate-bar3"></span>
    </div>
  );
}
