export interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  fetchSuggestions: (query: string) => Promise<any[]>;
  disabled?: boolean;
  error?: boolean;
}
