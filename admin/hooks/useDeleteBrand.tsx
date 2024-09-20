import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBrand as deleteBrandApi } from "@/services/brandApi";
export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBrand, isPending: isDeleting } = useMutation({
    mutationFn: deleteBrandApi,
    onSuccess: () => {
      console.log("Brand deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting brand:", error);
    },
  });

  return { deleteBrand, isDeleting };
};
