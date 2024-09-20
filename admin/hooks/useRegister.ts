import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerApi } from "@/services/AuthApi";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { mutate: register, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: (response) => {
      console.log("Register response:", response);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    register,
    isPending,
  };
};
