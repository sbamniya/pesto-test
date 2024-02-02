import useAuth from "@app/hooks/useAuth";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Todo: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
};

export default Todo;
