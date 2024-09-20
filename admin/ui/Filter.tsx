import { useRouter, useSearchParams } from "next/navigation";

interface Option {
  value: string;
  label: string;
}

function Filter({
  filterField,
  options,
}: {
  filterField: string;
  options: Option[];
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  const handleFilter = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(filterField, value);
    newSearchParams.set("page", "1");
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="border border-gray-100 bg-white rounded p-[0.4rem] flex gap-[0.4rem]">
      {options.map((option) => (
        <button
          key={option.value}
          className={`border-none rounded  text-sm py-[0.44rem] px-[0.8rem] transition-all duration-300 ${currentFilter === option.value ? "bg-orange-500 text-white" : "bg-white text-slate-700"}`}
          onClick={() => handleFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
