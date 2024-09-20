import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as LoginApi } from "@/services/AuthApi";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      LoginApi({ email, password }),
    onSuccess: (response) => {
      console.log("Login response:", response);
      if (response) {
        queryClient.setQueryData(["login"], response?.rest);
        router.push("/");
      } else {
        console.log("User data is missing in the response");
      }
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return { isLogin, login };
};
