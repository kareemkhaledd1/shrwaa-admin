import SearchInput from "@/ui/SearchInput";
import { useGetAllBrands } from "@/hooks/useGetAllBrands";

function PhoneOperations({
  selectedBrandId,
  onBrandChange,
}: {
  selectedBrandId: string;
  onBrandChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const { brands } = useGetAllBrands();

  return (
    <div className="flex items-center gap-5">
      <SearchInput placeholder={"search phone..."} />
      <div>
        <select
          className="w-[15rem] h-[2rem] px-3 text-slate-600 border border-orange-300 rounded-md outline-none"
          value={selectedBrandId}
          onChange={onBrandChange}
        >
          <option value="">All</option>
          {brands.map((brand: any) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PhoneOperations;
