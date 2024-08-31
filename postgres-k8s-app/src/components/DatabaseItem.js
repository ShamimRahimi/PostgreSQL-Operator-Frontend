// src/components/DatabaseItem.js
import React from "react";
import axios from "axios";

const DatabaseItem = ({ database }) => {
  const handleDelete = async () => {
    await axios.delete(`/api/databases/${database.id}`);
  };

  return (
    <div>
      <span>{database.name}</span>
      <span>{database.status}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DatabaseItem;
