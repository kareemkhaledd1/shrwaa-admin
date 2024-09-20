import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/services/OrderApi";

export const useOrderByID = (id: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
  });

  const order = data || {};

  return { order, isPending };
};
