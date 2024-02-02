import useAuth from "@app/hooks/useAuth";
import { login } from "@app/services/auth";
import { APIErrorResponse } from "@app/types/generic";
import Toast from "@app/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, Space } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/todos");
    },
    onError: (error: APIErrorResponse) => {
      Toast.error(error.response?.data.message);
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/todos");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Card title="Login with your credentials">
      <Form layout="vertical" onFinish={mutate}>
        <Form.Item
          name="username"
          label="Username"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter username",
            },
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter password",
            },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isPending}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <Space
        style={{
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <span>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </span>
      </Space>
    </Card>
  );
};
export default Login;
