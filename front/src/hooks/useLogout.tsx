import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["session"], { user: null });
      queryClient.invalidateQueries({ queryKey: ["session"] });
      navigate("/");
    },
  });
}
