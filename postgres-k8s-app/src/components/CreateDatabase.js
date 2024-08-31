import React, { useContext } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateDatabase = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, size } = values;
    const sizeAsNumber = parseInt(size, 10);

    try {
      const response = await axios.post(
        "http://shamim.umrc.ir/api/v1/app/",
        { name, size: sizeAsNumber },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        notification.success({
          message: "Database Created",
          description: `Database ${name} created successfully.`,
        });
        navigate("/databases"); 
      } else {
        notification.error({
          message: "Creation Failed",
          description: "Failed to create the database. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error creating database:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while creating the database.",
      });
    }
  };

  return (
    <div>
      <h2>Create Database</h2>
      <Form
        name="create-database"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: '',
          size: '',
        }}
      >
        <Form.Item
          name="name"
          label="Database Name"
          rules={[{ required: true, message: "Please input the database name!" }]}
        >
          <Input placeholder="Database Name" />
        </Form.Item>
        <Form.Item
          name="size"
          label="Size"
          rules={[
            {
              required: true,
            //   type: 'number',
            //   min: 1
            },
          ]}
        >
          <Input type="number" placeholder="Size" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Database
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateDatabase;
