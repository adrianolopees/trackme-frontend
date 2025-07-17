export default function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm  flex items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
}
