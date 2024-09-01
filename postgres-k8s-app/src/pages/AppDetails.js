import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Card, Typography, Spin, Alert, Row, Col, Divider } from "antd";

const { Title, Text } = Typography;

const AppDetails = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [appDetails, setAppDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const response = await axios.get(`http://shamim.umrc.ir/api/v1/app/${id}/`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setAppDetails(response.data);
      } catch (error) {
        setError("Error fetching app details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppDetails();
  }, [id, token]);

  if (loading) return <Spin tip="Loading..." size="large" style={{ display: 'block', margin: '20% auto' }} />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon style={{ maxWidth: 600, margin: '20px auto' }} />;

  return (
    <Card style={{ maxWidth: 800, margin: "40px auto", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        App Details: {appDetails.name}
      </Title>
      <Divider />
      <Row gutter={[16, 24]}>
        <Col span={12}>
          <Text strong>Status:</Text>
          <Text style={{ display: "block", marginTop: "5px" }}>{appDetails.state}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Creation Time:</Text>
          <Text style={{ display: "block", marginTop: "5px" }}>{new Date(appDetails.creation_time).toLocaleString()}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Size:</Text>
          <Text style={{ display: "block", marginTop: "5px" }}>{appDetails.size}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Pod Name:</Text>
          <Text style={{ display: "block", marginTop: "5px" }}>{appDetails.pod_name}</Text>
        </Col>
        <Col span={12}>
          <Text strong>User:</Text>
          <Text style={{ display: "block", marginTop: "5px" }}>{appDetails.user}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default AppDetails;
