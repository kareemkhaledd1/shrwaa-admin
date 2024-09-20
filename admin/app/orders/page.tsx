"use client";

import Row from "@/ui/Row";
import OrderTable from "@/components/order/OrderTable";
import Layout from "@/ui/Layout";
import OrderOperations from "@/components/order/OrderOperations";

function OrderPage() {
  return (
    <Layout>
      <Row type="horizontal">
        <h1 className="text-3xl font-semibold tracking-wider uppercase text-slate-700">
          All Orders
        </h1>
        <OrderOperations />
      </Row>

      <Row>
        <OrderTable />
      </Row>
    </Layout>
  );
}

export default OrderPage;
