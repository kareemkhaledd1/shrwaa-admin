"use client";

import Pagination from "@/ui/Pagination";
import Spinner from "@/ui/Spinner";
import Image from "next/image";
import { HiDotsVertical } from "react-icons/hi";
import Filter from "@/ui/Filter";
import AddBrand from "@/components/brand/AddBrand";
import { useBrand } from "@/hooks/useBrand";
import Table from "@/ui/Table";

interface Brand {
  id: string;
  name: string;
  image: string;
  available: boolean;
  published: boolean;
}

export default function BrandsPage() {
  const { brands, totalCount, isPending } = useBrand();

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Table>
      <div className="flex items-center justify-between w-full mb-2">
        <h1 className="text-3xl font-semibold ">All brands</h1>
        <div className="flex gap-5">
          <Filter
            filterField="filter"
            options={[
              { value: "all", label: "All" },
              { value: "available", label: "Available" },
              { value: "not-available", label: "Not available" },
              { value: "not-published", label: "Not published" },
              { value: "published", label: "published" },
            ]}
          />
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg">
        <div className="grid grid-cols-5 place-items-start py-4 px-5 bg-gray-50 border-b border-gray-200 text-gray-600 uppercase">
          <div></div>
          <h1 className="font-bold text-gray-600 text-xs pl-2">Name</h1>
          <h1 className="font-bold text-gray-600 text-xs">Available</h1>
          <h1 className="font-bold text-gray-600 text-xs">Published</h1>
          <div></div>
        </div>
        <div className="space-y-2.5 bg-gray-50 px-5">
          {brands.map((brand: Brand) => (
            <div
              key={brand.id}
              className="grid grid-cols-5 place-items-start border-b border-gray-100 p-3"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={400}
                height={200}
                className="max-w-[60px] w-auto max-h-[40px] h-auto object-cover object-center"
              />
              <p className="text-gray-600 font-semibold text-[16px] self-center">
                {brand.name}
              </p>
              <p
                className={`self-center text-sm font-semibold ${brand.available ? "text-green-500" : "text-red-300"}`}
              >
                {brand.available ? "Available" : "Not available"}
              </p>
              <p
                className={`self-center text-sm font-semibold ${brand.published ? "text-green-500" : "text-red-300"}`}
              >
                {brand.published ? "Published" : "Not published"}
              </p>
              <div className="flex justify-end w-full">
                <HiDotsVertical className="text-gray-400 text-2xl self-center cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
        <Pagination count={totalCount} />
      </div>
      {/*<button className="mt-3 bg-orange-500 text-white font-bold text-lg px-12 py-2 rounded">*/}
      {/*  Add brand*/}
      {/*</button>*/}
      <AddBrand />
    </Table>
  );
}
