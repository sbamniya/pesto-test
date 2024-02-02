import { Button } from "antd";
import React, { useState } from "react";
import TodoForm from "./Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@app/services/todo";
import Toast from "@app/utils/toast";
import { APIErrorResponse } from "@app/types/generic";

const AddTodo: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      setShowCreate(false);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error: APIErrorResponse) => {
      Toast.error(error.response?.data.message || "Unknown error occurred");
    },
  });
  return (
    <>
      <Button type="primary" icon="+" onClick={() => setShowCreate(true)}>
        Add New
      </Button>

      <TodoForm
        open={showCreate}
        onCancel={() => setShowCreate(false)}
        title="Create Todo"
        confirmLoading={isPending}
        onSubmit={mutate}
      />
    </>
  );
};

export default AddTodo;
