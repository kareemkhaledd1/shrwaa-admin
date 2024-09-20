import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand as createBrandApi } from "@/services/brandApi";

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  const { mutate: createBrand, isPending: isCreating } = useMutation({
    mutationFn: createBrandApi,
    onSuccess: () => {
      console.log("Brand created successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error: Error) => {
      console.error("Error creating brand:", error);
    },
  });

  return { createBrand, isCreating };
};
