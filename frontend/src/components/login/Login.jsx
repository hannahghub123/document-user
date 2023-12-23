import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import TextField from "@mui/material/TextField";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/Axios";
import Navbar from "../navbar/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("login/", {
        username,
        password,
      });

      const { access_token, refresh_token, message, userDetails } =
        response.data;
      console.log(message);

      if (message === "User loggedIn successfully") {
        // Store tokens in local storage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        navigate("../home");
      }
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };


  const passwordHandle = () => {
    navigate("../email-enter");
  };
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Card
            size="lg"
            variant="outlined"
            sx={{ bgcolor: "background.paper", width: "300px" }}
          >
            {" "}
            {/* Adjust background color */}
            <CardContent>
              <Typography level="h2" sx={{ textAlign: "center" }}>
                Login
              </Typography>
              <Divider />
              {/* Registration form fields */}
              <TextField
                label="Username"
                margin="normal"
                fullWidth
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Divider />
              <CardActions>
                <Button type="submit">Submit Form</Button>
              </CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={passwordHandle}
              >
                Forgot Password?
              </Button>
            </CardContent>
          </Card>
        </Box>
      </form>
    </div>
  );
};

export default Login;
