'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { usePagination } from '@/features/base/hooks/usePagination';

interface SearchInputProps {
  placeholder?: string;
  debounceDelay?: number; // Optional prop for debounce delay
  className?: string; // For custom styling
}

const SearchInput = ({ placeholder, debounceDelay = 600, className }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input element
  const { handleSearchChange, word } = usePagination();
  const [inputValue, setInputValue] = useState(word || ''); // Initialize input value with the current query state

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        handleSearchChange(inputValue);
      } else {
        handleSearchChange(null); // Clear the query param when input is empty
      }
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [inputValue, debounceDelay, handleSearchChange]);

  const clearInput = () => {
    setInputValue('');
    handleSearchChange(''); // Clear the query param
    inputRef.current?.focus(); // Refocus the input field
  };

  const handleSearch = () => {
    handleSearchChange(inputValue);
  };

  return (
    <div
      className={` relative flex items-center gap-x-1 rounded-xl border border-gray-300 bg-white pl-2 py-2 shadow-sm h-[45px] w-[300px] ${className}`}
    >
      <button
        type="button"
        onClick={handleSearch}
        className="text-gray-500 hover:text-gray-700 "
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => {
          if (e.target.value == '') {
            clearInput();
          } else {
            setInputValue(e.target.value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        placeholder={placeholder || 'Search'}
        className="flex-grow border-none bg-transparent outline-none placeholder-gray-500 w-full pr-7 mr-1"
        autoComplete="off"
      />
      {inputValue && (
        <button
          type="button"
          onClick={clearInput}
          className=" text-gray-500 hover:text-gray-700 absolute top-1/2 -translate-y-1/2 right-2"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
