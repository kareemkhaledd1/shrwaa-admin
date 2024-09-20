import React from "react";
import { useBrand } from "@/hooks/useBrand";
import Spinner from "@/ui/Spinner";
import Table from "@/ui/Table";
import BrandsRow from "@/components/brand/BrandsRow";
import Pagination from "@/ui/Pagination";
import Menus from "@/ui/Menus";

function BrandTable() {
  const { brands, totalCount, isPending } = useBrand();

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Menus>
      <Table columns="0.6fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <h1 className="font-bold text-gray-600 text-xs">Name</h1>
          <h1 className="font-bold text-gray-600 text-xs">Published</h1>
          <div></div>
        </Table.Header>
        <Table.Body
          data={brands}
          render={(brand) => <BrandsRow key={brand.id} brand={brand} />}
        />
        <Table.Footer>
          <Pagination count={totalCount} pageSize={8} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BrandTable;
