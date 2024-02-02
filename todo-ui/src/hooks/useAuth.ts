import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Nullable } from "../types/generic";
import type { User } from "../types/user";
import restClient from "../utils/rest";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [user, setUser] = useState<Nullable<User>>(null);

  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["user-details"],
    queryFn: () => restClient.get<User>("/auth/me"),
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (data) {
      setUser(data);
    }
    setIsLoggedIn(isSuccess);
  }, [isLoading, isSuccess, data]);

  return {
    isLoggedIn,
    user,
    setIsLoggedIn
  };
};

export default useAuth;
