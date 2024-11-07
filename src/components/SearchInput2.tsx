import { useEffect, useRef, useState } from "react";

import { getImageURL, getSearchMulti } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { SearchMultiResponse } from "@/types/api";

import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

interface ItemComponentProps {
  backdrop_path: string | null;
  title: string;
  index: number;
  year?: string;
  handleClick: () => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ backdrop_path, title, index, year, handleClick}) => {
  const text = title + (year ? ` (${year.slice(0, 4)})` : "")

  return (
    <div className="w-full h-full items-center">
      <li
        key={index}
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex w-full justify-between items-center"
        role="option"
        aria-selected={false}
        onClick={handleClick}
      >
        <div className="flex h-28 justify-center p-1">
          <img
            src={backdrop_path ? getImageURL(backdrop_path) : "default.jpg"}
            alt={title}
            className="h-full w-full object-contain"
          />
        </div>
        <span>{text}</span>
      </li>
    </div>
  );
};

export function SearchInput() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLUListElement>(null)

  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<SearchMultiResponse>({
    queryKey: ["searchMulti", query],
    queryFn: () => getSearchMulti(query),
  });

  const handleClick = (type: string, id: number) => {
    navigate(`/details/${type}/${id}`);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }, [query])
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10 bg-white"
          aria-label="Search input"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={showDropdown}
        />
        <Button 
          size="icon"
          variant="ghost" 
          className="absolute right-0 top-0 h-full bg-white"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      {showDropdown && (
        <ul
          id="search-results"
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {isLoading ? (
            <li className="px-4 py-2 text-gray-500">Loading...</li>
          ) : data?.results.length > 0 ? (
            data?.results.map((elem, index) => (
              <ItemComponent
                key={index}
                backdrop_path={elem.backdrop_path}
                title={elem.name || "Untitled"}
                year={elem.release_date || elem.first_air_date}
                index={index}
                handleClick={() => handleClick(elem.media_type, elem.id)}
              />
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;