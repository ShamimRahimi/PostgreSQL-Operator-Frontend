import React, { useContext } from "react";
import { Form, Input, Button, notification, Card, Typography } from "antd";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

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
    <Card style={{ maxWidth: 600, margin: "40px auto", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Create Database
      </Title>
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
          <Input placeholder="Enter database name" />
        </Form.Item>
        <Form.Item
          name="size"
          label="Size (in GB)"
          rules={[{ required: true, message: "Please input the database size!" }]}
        >
          <Input type="number" min={1} max={10} placeholder="Enter size" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Database
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateDatabase;
