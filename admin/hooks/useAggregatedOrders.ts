import { useQuery } from "@tanstack/react-query";
import { getAggregatedOrders } from "@/services/OrderApi";

export const useAggregatedOrders = () => {
  const { data, isPending } = useQuery({
    queryKey: ["aggregatedOrders"],
    queryFn: getAggregatedOrders,
  });

  return { data, isPending };
};
