import Stat from "@/ui/Stat";
import { HiShoppingBag } from "react-icons/hi2";

interface Order {
  id: string;
  orderStatus: string;
}

function Stats({ orders }: { orders: Order[] }) {
  const pendingOrders = orders.filter(
    (order: Order) => order.orderStatus === "Pending",
  ).length;
  const processingOrders = orders.filter(
    (order: Order) => order.orderStatus === "Processing",
  ).length;
  const confirmedOrders = orders.filter(
    (order: Order) => order.orderStatus === "Confirmed",
  ).length;

  return (
    <>
      <Stat
        color={"blue"}
        icon={<HiShoppingBag className="w-8 h-8 text-blue-400" />}
        title={"pending orders"}
        value={pendingOrders.toString()}
      />

      <Stat
        color={"yellow"}
        icon={<HiShoppingBag className="w-8 h-8 text-yellow-400" />}
        title={"processing orders"}
        value={processingOrders.toString()}
      />

      <Stat
        color={"green"}
        icon={<HiShoppingBag className="w-8 h-8 text-green-400" />}
        title={"confirmed orders"}
        value={confirmedOrders.toString()}
      />
    </>
  );
}

export default Stats;
