export default function Spinner({ fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-blue-500 animate-spin"></div>
      </div>
    </div>
  );
}