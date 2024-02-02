import SelectStatus from "@app/components/SelectStatus";
import SelectUser from "@app/components/SelectUser";
import { DatePicker, Form, FormProps, Input, Modal, ModalProps } from "antd";
import React, { useEffect } from "react";

const TodoForm: React.FC<
  Omit<ModalProps, "destroyOnClose" & "onOk" & "okText"> & {
    onSubmit: FormProps["onFinish"];
  }
> = ({ onSubmit, onCancel, open, ...modalProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [form, open]);

  return (
    <Modal
      destroyOnClose
      onOk={form.submit}
      onCancel={onCancel}
      okText="Save"
      open={open}
      {...modalProps}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Title"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item name="description" label="Description" hasFeedback>
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        <Form.Item name="assignedTo" label="Assigned to" hasFeedback>
          <SelectUser allowClear placeholder="Enter Assignee" />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date" hasFeedback>
          <DatePicker placeholder="Select Due Date" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="status" label="Status" hasFeedback>
          <SelectStatus showAll={false} placeholder="Select Status" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;
