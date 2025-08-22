import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-10 h-10 border-4 border-white/60 border-t-accent rounded-full animate-spin"></div>
    </div>
  );
}
