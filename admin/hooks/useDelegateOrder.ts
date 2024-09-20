import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delegateOrder } from "@/services/DelegateAPI";

export const useDelegateOrder = () => {
  const queryClient = useQueryClient();

  const { mutate: delegate, isPending } = useMutation({
    mutationFn: ({
      orderId,
      delegateId,
    }: {
      orderId: string;
      delegateId: string;
    }) =>
      delegateOrder({
        orderId,
        delegateId,
      }),
    onSuccess: () => {
      console.log("Order successfully delegated");
      queryClient.invalidateQueries({ queryKey: ["delegate-orders"] });
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    },
  });

  return { delegate, isPending };
};
