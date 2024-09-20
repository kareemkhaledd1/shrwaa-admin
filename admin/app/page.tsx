"use client";

import Layout from "@/ui/Layout";
import Row from "@/ui/Row";
import DashboardLayout from "@/ui/DashboardLayout";
import OrderCharts from "@/ui/OrderCharts";

export default function Home() {
  return (
    <Layout>
      <Row>
        <h1 className={"text-4xl mb-5 font-bold"}>Dashboard</h1>
      </Row>

      <DashboardLayout />
    </Layout>
  );
}
