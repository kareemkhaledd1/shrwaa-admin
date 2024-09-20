import Filter from "@/ui/Filter";

function BrandTableOperation() {
  return (
    <div className="flex gap-5">
      <Filter
        filterField="filter"
        options={[
          { value: "all", label: "All" },
          { value: "not-published", label: "Not published" },
          { value: "published", label: "published" },
        ]}
      />
    </div>
  );
}

export default BrandTableOperation;
