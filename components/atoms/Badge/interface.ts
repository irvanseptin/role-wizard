export type BadgeVariant = "default" | "primary" | "success" | "warning";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}
