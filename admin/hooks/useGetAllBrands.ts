import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "@/services/brandApi";

export const useGetAllBrands = () => {
  const { data } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
  });

  const brands = data?.brands ?? [];
  return { brands };
};
