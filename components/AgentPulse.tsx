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
  const colorClasses = {
    blue: "bg-primary shadow-lg dark:shadow-primary/80 shadow-primary/50",
  };
  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
    />
  );
};

export default AgentPulse;
