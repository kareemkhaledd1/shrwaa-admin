import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/services/OrderApi";

export const useAllOrders = () => {
  const { data: orders, isPending } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  return { orders, isPending };
};
