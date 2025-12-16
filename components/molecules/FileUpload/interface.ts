export interface FileUploadProps {
  value: string | null;
  onChange: (base64: string | null) => void;
}
