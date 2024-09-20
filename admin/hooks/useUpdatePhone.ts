import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePhone as updatePhoneApi } from "@/services/PhoneApi";

export const useUpdatePhone = () => {
  const queryClient = useQueryClient();

  const { mutate: updatePhone, isPending: isUpdating } = useMutation({
    mutationFn: ({ updatedData, id }: { updatedData: any; id: string }) =>
      updatePhoneApi(updatedData, id),
    onSuccess: () => {
      console.log("Phone updated successfully");
      queryClient.invalidateQueries({ queryKey: ["phones"] });
    },
  });

  return { updatePhone, isUpdating };
};
