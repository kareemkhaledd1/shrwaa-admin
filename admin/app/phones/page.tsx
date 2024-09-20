"use client";

import PhonesTable from "@/components/phone/PhonesTable";
import Row from "@/ui/Row";
import PhoneOperations from "@/components/phone/PhoneOperations";
import AddPhone from "@/components/phone/AddPhone";
import { useState } from "react";
import { usePhonesByBrand } from "@/hooks/usePhonesByBrand";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllBrands } from "@/hooks/useGetAllBrands";
import Layout from "@/ui/Layout";

function PhonesPage() {
  const searchParams = useSearchParams();
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const { phones, isPending, totalCount } = usePhonesByBrand(selectedBrandId);
  const router = useRouter();
  const { brands } = useGetAllBrands();

  const brandIdToNameMap = brands.reduce((map: any, brand: any) => {
    map[brand.id] = brand.name;
    return map;
  }, {});

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedName = brandIdToNameMap[selectedId] || "";
    const newSearchParams = new URLSearchParams(searchParams.toString());
    setSelectedBrandId(selectedId);
    newSearchParams.set("page", "1");
    newSearchParams.set("brand", selectedName);
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <Layout>
      <Row type="horizontal">
        <h1 className="text-3xl font-semibold text-slate-700 tracking-wider uppercase">
          All Phones
        </h1>
        <PhoneOperations
          selectedBrandId={selectedBrandId}
          onBrandChange={handleBrandChange}
        />
      </Row>

      <Row>
        <PhonesTable
          phones={phones}
          isPending={isPending}
          totalCount={totalCount}
        />
        <AddPhone />
      </Row>
    </Layout>
  );
}

export default PhonesPage;
