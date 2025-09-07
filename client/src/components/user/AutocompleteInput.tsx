import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import Fuse from "fuse.js";

interface Props { 
  fuse: Fuse<any>; // TODO:
  value: string;
  setValue: (val: string) => void;
  isValid: boolean;
  placeholder?: string;
}

export default function AutocompleteInput({
  fuse,
  value, 
  setValue,
  isValid,
  placeholder = "",
}: Props) {
  const filtered = fuse.search(value)
    .filter((result) => result.score !== undefined && result.score <= 0.4)
    .slice(0, 6)
    .map((result) => result.item);

  return (
    <Combobox value={value} onChange={(val) => setValue(val ?? "")}>
      <div className='relative w-full'>
        <ComboboxInput
          // aria-label=''
          type='text'
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          className={`
            w-full rounded border p-2 px-3 focus:outline-none focus:ring-blue-500 focus:ring-2
            ${isValid
              ? "placeholder:text-slate-400 border-slate-600 bg-slate-700 text-slate-200"
              : "border-red-500 focus:border-transparent"}
          `}
        />
        <ComboboxOptions 
          className="mt-1 z-10 w-full absolute rounded-md border shadow-md border-slate-600 bg-slate-800"
        >
          {filtered.map((option, i) => (
            <ComboboxOption 
              key={i} 
              value={option} 
              className='cursor-pointer px-3 py-2 text-sm text-white data-focus:bg-blue-500'
            >
              {option}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
