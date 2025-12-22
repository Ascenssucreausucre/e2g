import { login } from "../api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}
