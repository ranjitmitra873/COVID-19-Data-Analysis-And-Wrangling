import type React from "react"

export const NeonMazeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(74, 222, 128, 0.3)" />
            <stop offset="100%" stopColor="rgba(74, 222, 128, 0)" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="#0f172a" />
        <g fill="none" stroke="url(#neonGlow)" strokeWidth="0.5">
          <path d="M0 50 L100 50" />
          <path d="M50 0 L50 100" />
          <path d="M0 0 L100 100" />
          <path d="M100 0 L0 100" />
          <circle cx="50" cy="50" r="25" />
        </g>
        <g fill="rgba(74, 222, 128, 0.5)">
          <circle cx="0" cy="0" r="1" />
          <circle cx="100" cy="0" r="1" />
          <circle cx="100" cy="100" r="1" />
          <circle cx="0" cy="100" r="1" />
          <circle cx="50" cy="50" r="1" />
        </g>
      </svg>
    </div>
  )
}

