// src/components/Signup.js
import React, { useState } from 'react';
import { Form, Input, Button, notification, Card } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('http://shamim.umrc.ir/api/v1/signup/', values);
      notification.success({
        message: 'Signup Successful',
        description: 'You have successfully signed up. Please log in.',
      });
      navigate('/'); 
    } catch (error) {
      notification.error({
        message: 'Signup Error',
        description: 'There was an error during signup. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "40px auto", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item>
          <p style={{ textAlign: 'center' }}>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Signup;
