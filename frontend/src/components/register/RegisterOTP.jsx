import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import TextField from "@mui/material/TextField";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import axiosInstance from "../../axios/Axios";
import { useNavigate } from "react-router-dom";

const RegisterOTP = () => {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState(null);
  const otpDetails = localStorage.getItem("OTPDetails");

  const handleSubmit = (e) => {
    e.preventDefault();

    const parseData = JSON.parse(otpDetails);

    console.log(parseData);

    if (OTP === parseData.otp) {
      const values = {
        otp: parseData.otp,
        email: parseData.email,
      };
      axiosInstance.post("confirm-otp/", values).then((response) => {
        if (response.data.message === "Success") {
          localStorage.removeItem("OTPDetails");
          navigate("../login");
        }
      });
      console.log("success");
    } else {
      console.log("failed");
    }
  };

  return (
    <div>
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
                Register OTP
              </Typography>
              <Divider />

              <TextField
                label="OTP"
                type="password"
                margin="normal"
                fullWidth
                autoComplete="new-password"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />

              <Divider />
              <CardActions>
                <Button variant="contained" color="primary" type="submit">
                  Submit OTP
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </form>
    </div>
  );
};

export default RegisterOTP;
