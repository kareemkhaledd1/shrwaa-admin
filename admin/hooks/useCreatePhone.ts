import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPhone as createPhoneApi } from "@/services/PhoneApi";

export const useCreatePhone = () => {
  const queryClient = useQueryClient();

  const { mutate: createPhone, isPending: isCreating } = useMutation({
    mutationFn: createPhoneApi,
    onSuccess: () => {
      console.log("Phone created successfully");
      queryClient.invalidateQueries({ queryKey: ["phones"] });
    },
    onError: (error: Error) => {
      console.error("Error creating phone:", error);
    },
  });

  return { createPhone, isCreating };
};
