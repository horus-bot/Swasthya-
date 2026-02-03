import React from "react";

type LogoProps = {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512" // ⬅️ replace with your SVG's viewBox
      className={className}
      fill="currentColor"
      role="img"
      aria-label="App logo"
    >
      {/* ⬇️ PASTE EVERYTHING INSIDE <svg> FROM logo.svg HERE */}
      <path d="M..." />
      <path d="M..." />
    </svg>
  );
};

export default Logo;
