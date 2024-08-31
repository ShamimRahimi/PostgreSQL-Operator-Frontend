import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

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
    <div>
      <h2>Databases List</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px" }}
      />
      <ul>
        {filteredDatabases.map(db => (
          <li key={db.id}>
            <span>{db.name} - {db.state} - Size: {db.size}</span>
            <button onClick={() => handleDelete(db.id)}>Delete</button>
            <button onClick={() => {
              const newSize = prompt('Enter new size:', db.size);
              if (newSize && !isNaN(newSize)) {
                handleResize(db.id, parseInt(newSize, 10));
              }
            }}>Resize</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DatabasesList;
