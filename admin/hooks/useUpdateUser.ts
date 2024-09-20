import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "@/services/AuthApi";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: editUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserData,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["auth"], user);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error: Error) => {
      console.error("Error updating user:", error);
    },
  });
  return { editUser, isUpdating };
};
