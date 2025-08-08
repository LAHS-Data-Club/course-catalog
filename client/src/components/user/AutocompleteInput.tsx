import { useState } from "react";
import Fuse from "fuse.js";

interface Props { 
  fuse: Fuse<any>; // TODO:
  value: string;
  setValue: (val: string) => void;
  disabled: boolean;
  suggestions: string[];
  placeholder?: string;
}

// TODO: fix the messy parts here
export default function AutocompleteInput({
  fuse,
  value, 
  setValue,
  suggestions,
  disabled,
  placeholder = "",
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = fuse.search(value)
    .filter((result) => result.score !== undefined && result.score <= 0.4)
    .slice(0, 6)
    .map((result) => result.item);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? filtered.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      setActiveIndex(0);
      setValue(filtered[activeIndex]);
      setShowDropdown(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = value.trim() === "" || suggestions.includes(value);

    setActiveIndex(0); // reset autocomplete index
    setValue(value); 
    setShowDropdown(!isValid);
  }

  // TODO: meh repetition eh
  const isValid = value.trim() === "" || suggestions.includes(value);

  return (
    <div className="relative w-full">
      <input
        type="text"
        disabled={disabled}
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
        placeholder={placeholder}
        className={`
          w-full rounded border p-2 px-3 focus:outline-none focus:ring-blue-500 focus:ring-2
          ${isValid
            ? "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            : "border-red-500 focus:border-transparent"}
          ${disabled && "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500"}
        `}
      />

      {showDropdown && filtered.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-md dark:border-slate-600 dark:bg-slate-800">
          {filtered.map((option, i) => (
            <li
              key={option}
              onMouseDown={() => {
                setValue(option);
                setShowDropdown(false);
              }}
              className={`cursor-pointer px-3 py-2 text-sm ${
                i === activeIndex
                  ? "bg-blue-500 text-white"
                  : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
