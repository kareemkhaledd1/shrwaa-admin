import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/services/brandApi";

export const useBrand = () => {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const filterValue = searchParams.get("filter") || "all";

  const { isPending, data } = useQuery({
    queryKey: ["brands", currentPage, filterValue],
    queryFn: () => getBrands(currentPage, 8, filterValue),
  });

  const brands = data?.brands ?? [];
  const totalCount = data?.totalCount ?? 0;

  return {
    isPending,
    brands,
    totalCount,
  };
};
