import React from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message }) {
  return (
    <div className="flex items-center gap-2 bg-red-500/80 text-white px-4 py-2 rounded-lg shadow-md">
      <AlertCircle size={20} />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
