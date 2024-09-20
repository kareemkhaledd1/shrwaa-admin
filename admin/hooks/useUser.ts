import { useQuery } from "@tanstack/react-query";
import { userOptions } from "@/hooks/userOptions";
export const useUser = () => {
  const { isLoading, data: user, error } = useQuery(userOptions);

  return {
    isPending: isLoading,
    user,
    error,
    isAuthenticated: user?.role === "admin" || user?.role === "delegate",
    role: user?.role,
  };
};
