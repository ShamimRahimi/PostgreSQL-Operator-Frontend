import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { List, Button, Input, Card, Spin, message, Badge, Modal, Form } from "antd";
import { LoadingOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Search } = Input;

const DatabasesList = () => {
  const [databases, setDatabases] = useState([]);
  const [filteredDatabases, setFilteredDatabases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resizeId, setResizeId] = useState(null);
  const [resizeCurrentSize, setResizeCurrentSize] = useState(0);
  const [newSize, setNewSize] = useState("");
  const [resizeError, setResizeError] = useState("");
  const { token, logout } = useContext(AuthContext);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const fetchDatabases = async () => {
    try {
      const response = await axios.get('http://shamim.umrc.ir/api/v1/apps/', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setDatabases(response.data.results);
      setFilteredDatabases(response.data.results);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError('Error fetching databases');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabases();

    intervalRef.current = setInterval(() => {
      fetchDatabases();
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [token]);

  useEffect(() => {
    const results = databases.filter(db =>
      db.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDatabases(results);
  }, [searchTerm, databases]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this database?')) {
      try {
        await axios.delete(`http://shamim.umrc.ir/api/v1/app/${id}/`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setDatabases(databases.filter(db => db.id !== id));
        setFilteredDatabases(filteredDatabases.filter(db => db.id !== id));
      } catch (error) {
        console.error('Error deleting database:', error);
      }
    }
  };

  const showResizeModal = (id, currentSize) => {
    setResizeId(id);
    setResizeCurrentSize(currentSize);
    setIsModalVisible(true);
  };

  const handleResize = async () => {
    const parsedNewSize = parseInt(newSize, 10);

    if (isNaN(parsedNewSize)) {
      setResizeError('Invalid size entered. Please enter a number.');
      return;
    }

    if (parsedNewSize < 1) {
      setResizeError('Size must be at least 1 GB.');
      return;
    }

    if (parsedNewSize <= resizeCurrentSize) {
      setResizeError('New size cannot be smaller than or equal to the current size.');
      return;
    }

    try {
      await axios.put(`http://shamim.umrc.ir/api/v1/app/${resizeId}/`, { size: parsedNewSize }, {
        headers: {
          Authorization: `${token}`,
        },
      });
      fetchDatabases();
      message.success(`Database resized to ${parsedNewSize} GB successfully.`);
      setIsModalVisible(false);
      setNewSize("");
      setResizeError("");
    } catch (error) {
      console.error('Error resizing database:', error);
      message.error('Error resizing database. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewSize("");
    setResizeError("");
  };

  const getStatusBadge = (state) => {
    if (state === 'Running') {
      return <Badge status="success" text="Running" icon={<CheckCircleOutlined />} />;
    } else if (state === 'Pending') {
      return <Badge status="processing" text="Pending" icon={<LoadingOutlined />} />;
    } else {
      return <Badge status="warning" text="Unknown" icon={<ExclamationCircleOutlined />} />;
    }
  };

  return (
    <Card style={{ maxWidth: 800, margin: "40px auto", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center" }}>Databases List</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <Search
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      {loading ? (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={filteredDatabases}
          renderItem={db => (
            <List.Item
              actions={[
                <Button danger type="link" onClick={() => handleDelete(db.id)}>Delete</Button>,
                <Button type="link" onClick={() => showResizeModal(db.id, db.size)}>Resize</Button>,
              ]}
            >
              <List.Item.Meta
                title={<Link to={`/details/${db.id}`} style={{ fontSize: '18px', fontWeight: '500' }}>{db.name}</Link>}
                description={
                  <>
                    {getStatusBadge(db.state)} | Size: {db.size} GB
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}

      <Modal
        title="Resize Database"
        visible={isModalVisible}
        onOk={handleResize}
        onCancel={handleCancel}
        okText="Resize"
      >
        <Form layout="vertical">
          <Form.Item label={`Current Size: ${resizeCurrentSize} GB`}>
            <Input
              type="number"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              min={resizeCurrentSize}
              placeholder={`Enter a size greater than ${resizeCurrentSize} GB`}
            />
          </Form.Item>
          {resizeError && <p style={{ color: 'red' }}>{resizeError}</p>}
        </Form>
      </Modal>
    </Card>
  );
};

export default DatabasesList;
