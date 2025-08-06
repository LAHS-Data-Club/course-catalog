import { useState } from "react";

// TODO: its kinda silly rn but uh lol... someone fix later
export default function Error({ message }) {
  const [show, setShow] = useState(true); // TODO:

  if (!show) return null;

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-400 text-white px-4 py-2 rounded shadow-lg z-50 opacity-70 text-center">
      <strong>Error:</strong> {message}
    </div>
  );
}