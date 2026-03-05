import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <Box className="role-container">

      <Typography variant="h4" className="role-title">
        Signup As
      </Typography>

      <Box className="role-btns">
        <Button
          variant="contained"
          className="role-btn primary"
          onClick={() => navigate("/photographer-signup")}
        >
          Photographer
        </Button>

        <Button
          variant="outlined"
          className="role-btn"
          onClick={() => navigate("/user-signup")}
        >
          User
        </Button>
      </Box>

    </Box>
  );
};

export default Signup;