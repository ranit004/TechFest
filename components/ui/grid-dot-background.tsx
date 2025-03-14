"use client";

import React from "react";

export default function GridDotBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.02] bg-grid-black/[0.02]" />
      
      {/* Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/0" />
    </div>
  );
} 