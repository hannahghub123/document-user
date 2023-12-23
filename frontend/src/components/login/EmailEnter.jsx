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
import Navbar from "../navbar/Navbar";

const EmailEnter = () => {

    const [email,setEmail] = useState('')

    const handleSubmit = (e)=>{

        e.preventDefault()

        const values = {
            email:email,
        }

        localStorage.setItem("EmailDetails",JSON.stringify(values))

        axiosInstance.post('reset-password/',values)

    }

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
                Enter your Email Here
              </Typography>
              <Divider />

              <TextField
                label="Email"
                type="text"
                margin="normal"
                fullWidth
                autoComplete="new-password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Divider />
              <CardActions>
                <Button variant="contained" color="primary" type="submit">
                  Send OTP
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </form>
    </div>
  );
};

export default EmailEnter;
