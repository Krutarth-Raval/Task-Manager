import React, { useState, useRef, useEffect } from "react";
import { LucideChevronDown, Check } from "lucide-react";

const SelectDropdown = ({ option, value, onChange, placeholder, disabled = false, error = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (disabled) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const selectedOption = option.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`w-full px-4 py-3 text-left border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between ${
          disabled 
            ? 'bg-surface cursor-not-allowed text-color' 
            : error
              ? 'border-red-300 bg-red-50 hover:border-red-400'
              : 'border-gray-300 bg-surface hover:border-gray-400 cursor-pointer'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={selectedOption ? selectedOption.label : placeholder}
      >
        <span className={selectedOption ? 'text-color' : 'text-color-light'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <LucideChevronDown 
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''} ${
            disabled ? 'text-color' : 'text-color-light'
          }`} 
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute w-full mt-1 bg-primary border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
          {option.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={`w-full px-4 py-3 text-left bg-color hover:bg-[var(--background-surface)] transition-colors flex items-center justify-between ${
                value === opt.value ? 'bg-surface text-color ' : 'text-color-light'
              } cursor-pointer`}
              role="option"
              aria-selected={value === opt.value}
            >
              <span>{opt.label}</span>
              {value === opt.value && (
                <Check className="w-4 h-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;