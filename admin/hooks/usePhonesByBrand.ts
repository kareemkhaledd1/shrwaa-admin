import { useQuery } from "@tanstack/react-query";
import { getPhones } from "@/services/PhoneApi";
import { useSearchParams } from "next/navigation";

export const usePhonesByBrand = (id?: string) => {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = 8; // you can also get this from searchParams if it's dynamic
  const search = searchParams.get("search") || "";

  const queryKey =
    id === ""
      ? ["phones", currentPage, pageSize, search]
      : ["phones", currentPage, pageSize, search, id];

  const { data, isPending } = useQuery({
    queryKey,
    queryFn: () =>
      getPhones(currentPage, pageSize, search, id === "all" ? "" : id),
  });

  const phones = data?.products ?? [];
  const totalCount = data?.totalCount ?? 0;

  return { phones, isPending, totalCount };
};
