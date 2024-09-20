"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleSearch = (e: any) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("search", searchTerm);
    newSearchParams.set("page", "1"); // Reset to first page on new search
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-100 bg-white rounded  h-[2.5rem]"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow px-3 py-2 text-sm outline-none bg-transparent border focus:border-orange-300 w-[15rem] rounded-md"
        placeholder={placeholder}
      />
    </form>
  );
}

export default SearchInput;
