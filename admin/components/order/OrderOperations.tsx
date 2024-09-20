import SearchInput from "@/ui/SearchInput";
import SortBy from "@/ui/SortBy";

function OrderOperations() {
  return (
    <div className="flex items-center gap-7">
      <SearchInput placeholder={"search order.."} />
      <div className="flex items-center gap-5">
        <SortBy
          options={[
            { value: "desc", label: `Des ⬇` },
            { value: "asc", label: `Asc ⬆` },
          ]}
        />
      </div>
    </div>
  );
}

export default OrderOperations;
