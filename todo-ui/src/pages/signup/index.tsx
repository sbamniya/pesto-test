import useAuth from "@app/hooks/useAuth";
import { signup } from "@app/services/auth";
import { APIErrorResponse } from "@app/types/generic";
import Toast from "@app/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input, Space } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
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
    <Card title="Create your account">
      <Form layout="vertical" onFinish={mutate}>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please enter username",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please enter password",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isPending}>
            Create Account
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
          Already have an account? <Link to="/">Login</Link>
        </span>
      </Space>
    </Card>
  );
};
export default Signup;
