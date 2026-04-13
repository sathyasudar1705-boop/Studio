import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import API from "../services/api";
import "./Auth.css";

const PhotographerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await API.post("/photographers/signup", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", "photographer");
      alert("Registration successful!");
      navigate("/photographer-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please check details.");
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
        <Typography variant="h4" className="auth-title">Photographer Signup</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField 
          name="name" 
          label="Full Name" 
          fullWidth 
          margin="normal" 
          className="auth-input" 
          value={formData.name}
          onChange={handleChange}
        />
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
          variant="contained" 
          fullWidth 
          className="auth-btn" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <p className="auth-switch">Already have an account? <span onClick={() => navigate("/photographer-login")}>Login here</span></p>
        <p className="auth-back" onClick={() => navigate("/")}>← Back to home</p>
      </Box>
    </div>
  );
};

export default PhotographerSignup;