import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box className="role-container">

      <Typography variant="h4" className="role-title">
        Login As
      </Typography>

      <Box className="role-btns">
        <Button
          variant="contained"
          className="role-btn primary"
          onClick={() => navigate("/photographer-login")}
        >
          Photographer
        </Button>

        <Button
          variant="outlined"
          className="role-btn"
          onClick={() => navigate("/user-login")}
        >
          User
        </Button>
      </Box>

    </Box>
  );
};

export default Login;