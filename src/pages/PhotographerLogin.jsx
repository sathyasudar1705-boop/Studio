import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import API from "../services/api";
import "./Auth.css";

const PhotographerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await API.post("/photographers/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", "photographer");
      alert("Login successful!");
      navigate("/photographer-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <Box className="auth-card">
        <Typography className="auth-brand">
          <CameraOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          LENSORIA STUDIO
        </Typography>
        <Typography variant="h4" className="auth-title">Photographer Login</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField 
          name="email" 
          label="Email" 
          fullWidth 
          margin="normal" 
          className="auth-input" 
          value={formData.email}
          onChange={handleChange}
        />
        <TextField 
          name="password" 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          className="auth-input" 
          value={formData.password}
          onChange={handleChange}
        />

        <Button 
          className="auth-btn" 
          fullWidth 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="auth-back" onClick={() => navigate("/")}>← Back to home</p>
      </Box>
    </div>
  );
};

export default PhotographerLogin;