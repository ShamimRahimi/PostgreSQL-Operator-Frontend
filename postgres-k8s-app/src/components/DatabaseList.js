import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { List, Button, Input, notification, Card } from "antd";

const { Search } = Input;

const DatabasesList = () => {
  const [databases, setDatabases] = useState([]);
  const [filteredDatabases, setFilteredDatabases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
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
        setError('Error fetching databases');
        console.error(error);
      }
    };

    fetchDatabases();
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

  const handleResize = async (id, newSize) => {
    try {
      await axios.put(`http://shamim.umrc.ir/api/v1/app/${id}/`, { size: newSize }, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const response = await axios.get('http://shamim.umrc.ir/api/v1/apps/', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setDatabases(response.data.results);
      setFilteredDatabases(response.data.results);
    } catch (error) {
      console.error('Error resizing database:', error);
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
      <List
        itemLayout="horizontal"
        dataSource={filteredDatabases}
        renderItem={db => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleDelete(db.id)}>Delete</Button>,
              <Button type="link" onClick={() => {
                const newSize = prompt('Enter new size:', db.size);
                if (newSize && !isNaN(newSize)) {
                  handleResize(db.id, parseInt(newSize, 10));
                }
              }}>Resize</Button>,
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/details/${db.id}`} style={{ fontSize: '18px', fontWeight: '500' }}>{db.name}</Link>}
              description={`Status: ${db.state} | Size: ${db.size} GB`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DatabasesList;
