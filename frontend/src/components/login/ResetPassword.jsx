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

const ResetPassword = () => {

    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleSubmit =(e)=>{
        e.preventDefault()

        const emailDetails = localStorage.getItem("EmailDetails")
        const parseData = JSON.parse(emailDetails)
        if(password===newPassword){
            const values = {
                email:parseData.email,
                password:password
            }

            axiosInstance.post('set-password/',values)
            .then((res)=>{
                console.log(res.data);
                if(res.data.message === "success"){
                    localStorage.removeItem('EmailDetails')
                    navigate('../login')
                }
            })
        }
    }

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
                label="New Password"
                type="password"
                margin="normal"
                fullWidth
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Confirm-Password"
                type="password"
                margin="normal"
                fullWidth
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Divider />
              <CardActions>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </form>
    </div>
  );
};

export default ResetPassword;
