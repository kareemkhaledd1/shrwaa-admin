import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/OrderApi";
import { useSearchParams } from "next/navigation";

export const useOrder = () => {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const SortOrder = searchParams.get("sortOrder") || "desc";

  const { data, isPending } = useQuery({
    queryKey: ["orders", currentPage, 12, search, SortOrder],
    queryFn: () => getOrders(currentPage, 12, search, SortOrder),
  });

  const orders = data?.orders || [];
  const totalCount = data?.totalCount || 0;

  return { orders, isPending, totalCount, SortOrder };
};
