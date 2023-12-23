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
import { useDispatch } from "react-redux";
import Navbar from "../navbar/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("register/", {
        username,
        email,
        password1,
        password2,
      });

      console.log(response.data,"//////??hi");
      if (response.data.message === "User registered successfully") {

        const responseOtp = response.data.OTP;
        const responseEmail = response.data.email;

        const values ={
          otp: responseOtp,
          email : responseEmail
        }

        localStorage.setItem("OTPDetails",JSON.stringify(values))


        navigate("../otp-register/");
      }
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  const loginHandle = () => {
    navigate("../login");
  };
  return (
    <div>
      <Navbar/>
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
                Register
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
                label="Email"
                type="email"
                margin="normal"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                autoComplete="new-password"
                onChange={(e) => setPassword1(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                margin="normal"
                fullWidth
                autoComplete="new-password"
                onChange={(e) => setPassword2(e.target.value)}
              />
              <Divider />
              <CardActions>
                <Button  color="primary" type="submit">
                  Submit Form
                </Button>
              </CardActions>
              <Button variant="contained" onClick={loginHandle}>Already a User?</Button>
            </CardContent>
          </Card>
        </Box>
      </form>
    </div>
  );
};

export default Register;
