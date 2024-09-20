"use client";

import Stats from "@/ui/Stats";
import { useAllOrders } from "@/hooks/useAllOrders";
import Spinner from "@/ui/Spinner";
import OrderCharts from "@/ui/OrderCharts";

function DashboardLayout() {
  const { orders, isPending } = useAllOrders();

  if (isPending) return <Spinner />;

  return (
    <div className="grid grid-cols-4 grid-rows-[auto,auto] gap-6">
      <Stats orders={orders} />

      <div className="col-span-4">
        <OrderCharts />
      </div>
    </div>
  );
}

export default DashboardLayout;
