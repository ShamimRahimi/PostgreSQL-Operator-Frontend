import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import DatabasesList from "./pages/DatabasesList";
import CreateDatabase from "./components/CreateDatabase";
import AppDetails from "./pages/AppDetails";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/databases" element={<DatabasesList />} />
          <Route path="/create" element={<CreateDatabase />} />
          <Route path="/details/:id" element={<AppDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
