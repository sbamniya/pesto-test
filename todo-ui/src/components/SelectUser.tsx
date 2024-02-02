import { getUsers } from "@app/services/user";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectProps } from "antd";
import React from "react";

const SelectUser: React.FC<SelectProps> = ({ ...props }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return (
    <Select
      loading={isLoading}
      {...props}
      options={data?.data.map((user) => ({
        label: user.username,
        value: user.id,
      }))}
    />
  );
};

export default SelectUser;
