import React from "react";
import * as Icons from "lucide-react";
import { IconProps } from "./interface";
import "./styles.scss";

export const Icon: React.FC<IconProps> = ({
  name,
  size = 18,
  color,
  className = "",
}) => {
  const IconComponent = Icons[name] as React.ComponentType<any>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <span className={`icon ${className}`} style={{ color }}>
      <IconComponent size={size} />
    </span>
  );
};

export default Icon;
