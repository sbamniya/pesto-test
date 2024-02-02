import SearchInput from "@app/components/SearchInput";
import SelectStatus from "@app/components/SelectStatus";
import SelectUser from "@app/components/SelectUser";
import { getTodos, updateTodo } from "@app/services/todo";
import { Todo } from "@app/types/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Card,
  DatePicker,
  DatePickerProps,
  List,
  Space,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddTodo from "./AddTodo";
import styles from "./styles.module.scss";
import { APIErrorResponse } from "@app/types/generic";
import Toast from "@app/utils/toast";

const DueDate = ({
  dueDate,
  onDateChange,
}: {
  dueDate?: Todo["dueDate"];
  onDateChange: DatePickerProps["onChange"];
}) => {
  const [showPicker, setPicker] = useState(false);

  const differenceInDays = dayjs().diff(dueDate, "day");

  return (
    <Space>
      {dueDate && !showPicker && (
        <Tooltip title={<>Due Date: {dayjs(dueDate).format("DD MMM, YYYY")}</>}>
          <small
            className={`${
              differenceInDays > 0 ? styles.overdue : styles.dueDate
            }`}
          >
            Due{" "}
            {differenceInDays === 0
              ? "Today"
              : differenceInDays > 0
              ? `${differenceInDays} days ago`
              : `in ${Math.abs(differenceInDays)} days`}
          </small>
        </Tooltip>
      )}
      {showPicker && (
        <DatePicker
          defaultValue={dueDate ? dayjs(dueDate) : undefined}
          onChange={onDateChange}
          onBlur={() => setPicker(false)}
        />
      )}
      <small
        className={styles.pointer}
        onClick={() => setPicker((prev) => !prev)}
      >
        {showPicker ? "Cancel" : "Change Date"}
      </small>
    </Space>
  );
};

const TodoList: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const search = params.get("search") ?? "";
  const status = (params.get("status") ?? "") as Todo["status"];

  const { data, isLoading } = useQuery({
    queryKey: ["todos", { search, status }],
    queryFn: () => getTodos({ search, status }),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
      Toast.success("Todo updated successfully");
    },
    onError: (error: APIErrorResponse) => {
      Toast.error(error.response?.data.message || "Unknown error occurred");
    },
  });

  const redirect = (values: { search?: string; status?: string }) => {
    setParams({
      search,
      status,
      ...values,
    });
  };

  return (
    <Card title="Todo List">
      <div className={styles.filterSection}>
        <SearchInput
          defaultValue={search}
          onSearch={(val) =>
            redirect({
              search: val,
            })
          }
        />
        <SelectStatus
          defaultValue={status}
          className={styles.selectBox}
          onChange={(val) => redirect({ status: val })}
        />
        <AddTodo />
      </div>
      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={data?.data ?? []}
        pagination={{
          pageSize: 10,
          total: data?.total,
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <SelectStatus
                showAll={false}
                defaultValue={item.status}
                loading={isPending}
                onChange={(val) =>
                  mutate({
                    id: item.id,
                    data: {
                      ...item,
                      status: val,
                    },
                  })
                }
              />,
              <SelectUser
                defaultValue={item.assignedTo}
                placeholder="Select Assignee"
                loading={isPending}
                onChange={(val) =>
                  mutate({
                    id: item.id,
                    data: {
                      ...item,
                      assignedTo: val,
                    },
                  })
                }
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar size={40}>
                  {(item.assignee?.username || "N/A").charAt(0).toUpperCase()}
                </Avatar>
              }
              title={item.title}
              description={
                <>
                  {item.description && <div>{item.description}</div>}
                  <DueDate
                    dueDate={item.dueDate}
                    onDateChange={(value) =>
                      mutate({
                        id: item.id,
                        data: {
                          ...item,
                          dueDate: value?.toISOString() ?? null,
                        },
                      })
                    }
                  />
                </>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TodoList;
