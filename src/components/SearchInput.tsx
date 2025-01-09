import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getImageURL, getSearchMulti } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { SearchMultiResponse } from "@/types/api";

interface ItemComponentProps {
  backdrop_path: string | null;
  title: string;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ backdrop_path, title }) => {
  return (
    <CommandItem className="flex w-full h-full items-center justify-between">
      <div className="flex h-28 justify-center p-1">
        <img
          src={backdrop_path ? getImageURL(backdrop_path) : "default.jpg"}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>
      <span>{title}</span>
    </CommandItem>
  );
};

export function SearchInput() {
  const [query, setQuery] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { data, error, isLoading } = useQuery<SearchMultiResponse>({
    queryKey: ["searchMulti", query],
    queryFn: () => getSearchMulti(query),
  });

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[250px]">
      <CommandInput placeholder="Search..." onChangeCapture={handleSearch} />
      <CommandList>
        <CommandGroup>
          {data?.results.map((item) => (
            <ItemComponent
              backdrop_path={item.backdrop_path}
              title={item.name || "Untitled"}
            />
          ))}
          <ItemComponent backdrop_path={null} title="Untitled" />
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default SearchInput;