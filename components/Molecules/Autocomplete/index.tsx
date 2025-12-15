import React, { useState, useRef } from "react";
import Input from "@/components/atoms/Input";
import Icon from "@/components/atoms/Icon";
import { Department, Location } from "@/types/index";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AutocompleteProps } from "./interface";
import "./styles.scss";

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  placeholder,
  fetchSuggestions,
  disabled = false,
  error = false,
}) => {
  const [suggestions, setSuggestions] = useState<Location[] | Department[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    if (val.length > 0) {
      setLoading(true);
      setIsOpen(true);
      try {
        const results = await fetchSuggestions(val);
        setSuggestions(results);
      } catch (error) {
        console.error("Fetch error:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (suggestion: Location | Department) => {
    onChange(suggestion.name);
    setIsOpen(false);
  };

  return (
    <div className="autocomplete" ref={wrapperRef}>
      <Input
        value={value}
        onChange={handleInputChange}
        onFocus={() => value && setIsOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        leftIcon={<Icon name="Search" size={18} />}
      />
      {isOpen && (
        <div className="autocomplete__dropdown">
          {loading ? (
            <div className="autocomplete__item autocomplete__item--loading">
              Loading...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="autocomplete__item"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.name}
              </div>
            ))
          ) : (
            <div className="autocomplete__item autocomplete__item--empty">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
