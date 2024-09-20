import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePhone as deletePhoneApi } from "@/services/PhoneApi";

export const useDeletePhone = () => {
  const queryClient = useQueryClient();

  const { mutate: deletePhone, isPending: isDeleting } = useMutation({
    mutationFn: deletePhoneApi,
    onSuccess: () => {
      console.log("Phone deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["phones"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting phone:", error);
    },
  });
  return { deletePhone, isDeleting };
};
