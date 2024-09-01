import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Button, Card, Spin, Alert } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import './AppDetails.css'; // Ensure this is correctly linked

const AppDetails = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [appDetails, setAppDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate("/databases");
  };

  if (loading) return <div className="app-details-spinner"><Spin size="large" /></div>;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div className="app-details-container">
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        style={{ marginBottom: '20px' }}
      >
        Back to List
      </Button>
      <Card
        title={`Details for ${appDetails.name}`}
        bordered={false}
        style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}
      >
        <p><strong>Status:</strong> {appDetails.state}</p>
        <p><strong>Creation Time:</strong> {new Date(appDetails.creation_time).toLocaleString()}</p>
        <p><strong>Size:</strong> {appDetails.size} GB</p>
        <p><strong>Pod Name:</strong> {appDetails.pod_name}</p>
        <p><strong>User:</strong> {appDetails.user}</p>
      </Card>
    </div>
  );
};

export default AppDetails;
