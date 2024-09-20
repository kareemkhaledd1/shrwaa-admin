"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Option = {
  value: string;
  label: string;
};

function SortBy({ options }: { options: Option[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortBy = searchParams.get("sortOrder") || options[0].value;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sortOrder", e.target.value);
    newSearchParams.set("page", "1");
    router.push(`?${newSearchParams.toString()}`);
  }

  return (
    <div>
      <select
        value={sortBy}
        onChange={handleChange}
        className="text-[17px] py-1.5 px-8 border border-gray-200 rounded-md focus:outline-none focus:border-orange-300 bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortBy;
