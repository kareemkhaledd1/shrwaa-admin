import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "@/services/AuthApi";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      router.push("/login");
    },
  });

  return { logout };
};
