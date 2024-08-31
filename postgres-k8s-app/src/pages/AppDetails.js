// src/pages/AppDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";

const AppDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    const fetchApp = async () => {
      const result = await axios.get(`/api/databases/${id}`);
      setApp(result.data);
    };
    fetchApp();
  }, [id]);

  const onFinish = async (values) => {
    await axios.put(`/api/databases/${id}`, values);
    // Handle success
  };

  if (!app) return <div>Loading...</div>;

  return (
    <div>
      <h1>{app.name}</h1>
      <p>Status: {app.status}</p>
      <p>Creation Time: {app.creation_time}</p>
      <p>Public Address: {app.public_address}</p>
      <Form onFinish={onFinish}>
        <Form.Item name="size" label="App Size" initialValue={app.size}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">Update Size</Button>
      </Form>
    </div>
  );
};

export default AppDetails;
