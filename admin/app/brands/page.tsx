"use client";

import BrandTableOperation from "@/components/brand/BrandTableOperation";
import Row from "@/ui/Row";
import BrandTable from "@/components/brand/BrandTable";
import AddBrand from "@/components/brand/AddBrand";
import Layout from "@/ui/Layout";

export default function BrandsPage() {
  return (
    <Layout>
      <Row type="horizontal">
        <h1 className="font-semibold text-slate-700 text-3xl uppercase tracking-wider">
          All brands
        </h1>
        <BrandTableOperation />
      </Row>

      <Row>
        <BrandTable />
        <AddBrand />
      </Row>
    </Layout>
  );
}
