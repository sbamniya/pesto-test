import { notification } from "antd";
import React from "react";

const success = (message: React.ReactNode) => {
  notification.destroy();
  return notification.success({
    message: "Success",
    description: message,
    type: "success",
  });
};

const error = (message: React.ReactNode) => {
  notification.destroy();
  return notification.error({
    message: "Error",
    description: message,
    type: "error",
  });
};

const info = (message: React.ReactNode) => {
  notification.destroy();
  return notification.info({
    message: "Info",
    description: message,
    type: "info",
  });
};

const warning = (message: React.ReactNode) => {
  notification.destroy();
  return notification.warning({
    message: "Warning",
    description: message,
    type: "warning",
  });
};

const Toast = {
  success,
  error,
  info,
  warning,
};

export default Toast;
