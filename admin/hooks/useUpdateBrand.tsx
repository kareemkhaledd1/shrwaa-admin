import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBrand as updateBrandApi } from "@/services/brandApi";

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  const { mutate: updateBrand, isPending: isUpdating } = useMutation({
    mutationFn: ({ newBrandData, id }: { newBrandData: any; id: string }) =>
      updateBrandApi(newBrandData, id),
    onSuccess: () => {
      console.log("Brand updated successfully");
      queryClient.invalidateQueries({ queryKey: ["brand"] });
    },
    onError: (error: Error) => {
      console.error("Error updating brand:", error);
    },
  });

  return { updateBrand, isUpdating };
};
