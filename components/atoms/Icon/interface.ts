import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}
