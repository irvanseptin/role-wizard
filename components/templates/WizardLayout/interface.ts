export interface WizardLayoutProps {
  role: string;
  stepper?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClearDraft: () => void;
  onCancel: () => void;
}
