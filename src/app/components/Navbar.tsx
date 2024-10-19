"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onSearch: (query: string) => void;
  onAddClick: () => void;
}

export default function Navbar({ onSearch, onAddClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput(""); // Clear input after search
    } else {
      alert("Please enter a search term!");
    }
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <h1 className="text-2xl font-bold">Spoonacular CRUD</h1>

        {/* Hamburger Menu Icon (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navbar Links for Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Search recipes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="px-4 py-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Search
            </button>
          </form>
          <button
            onClick={onAddClick}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add Product
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-gray-800 p-4 space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Search recipes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Search
            </button>
          </form>
          <button
            onClick={onAddClick}
            className="w-full bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add Product
          </button>
        </div>
      )}
    </nav>
  );
}
