import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import DatabasesList from "./pages/DatabasesList";
import CreateDatabase from "./components/CreateDatabase";
import AppDetails from "./pages/AppDetails";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Content />
      </Router>
    </AuthProvider>
  );
};

const Content = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/databases" element={<DatabasesList />} />
        <Route path="/create" element={<CreateDatabase />} />
        <Route path="/details/:id" element={<AppDetails />} />
      </Routes>
    </>
  );
};

export default App;
