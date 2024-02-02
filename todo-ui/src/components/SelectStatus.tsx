import {
  ClockCircleOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Select, SelectProps } from "antd";
import React, { useMemo } from "react";

const SelectStatus: React.FC<SelectProps & { showAll?: boolean }> = ({
  showAll = true,
  ...props
}) => {
  const options = useMemo(() => {
    const opt = [
      {
        label: (
          <>
            <ClockCircleOutlined />&nbsp;&nbsp;Pending
          </>
        ),
        value: "Pending",
      },
      {
        label: (
          <>
            <LoadingOutlined />&nbsp;&nbsp;In Progress
          </>
        ),
        value: "Inprogress",
      },
      {
        label: (
          <>
            <CheckCircleOutlined />&nbsp;&nbsp;Completed
          </>
        ),
        value: "Completed",
      },
    ];

    if (showAll) {
      opt.unshift({
        label: <>All</>,
        value: "",
      });
    }
    return opt;
  }, [showAll]);

  return <Select {...props} options={options} />;
};

export default SelectStatus;
