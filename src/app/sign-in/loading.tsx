import { ImSpinner9 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-auto h-screen">
      <ImSpinner9 className="text-6xl animate-spin" />
    </div>
  );
}
