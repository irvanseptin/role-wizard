export interface PageHeaderProps {
  title: string;
  action?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}
