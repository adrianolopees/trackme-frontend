import Spinner from "../ui/Spinner";

export default function FullPageSpinner() {
  return (
    <div className="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm  flex items-center justify-center">
      <Spinner size="lg" color="blue" />
    </div>
  );
}
