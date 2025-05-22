import React from "react";
type AgentPulseProps = {
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "purple";
};

const AgentPulse = ({ size = "medium", color = "blue" }: AgentPulseProps) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  // Updated to use DaisyUI theme colors and appropriate shadow
  // The shadow effect might differ slightly but will be theme-consistent.
  // Using CSS variables for shadow color to match the bg color.
  const colorClasses = {
    blue: "bg-primary shadow-lg shadow-primary/50", // Or use a specific blue if 'primary' isn't blue in the theme
    green: "bg-success shadow-lg shadow-success/50",
    purple: "bg-accent shadow-lg shadow-accent/50",
  };

  // If the current theme's primary is not blue, we might need to adjust.
  // For the "light" theme, primary is often blue-ish.
  // If a specific blue is needed regardless of theme, then 'bg-blue-500 shadow-blue-500/50' would be kept.
  // But the goal is to align with DaisyUI theme.

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
    />
  );
};

export default AgentPulse;
