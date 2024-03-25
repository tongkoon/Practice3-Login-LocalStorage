/* eslint-disable @typescript-eslint/no-unused-vars */
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import userJson from "../../dataUser.json";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Card sx={{ display: "flex", minWidth: 275, borderRadius: "10px" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              image="https://dhetwebapps.dhet.gov.za/cet/css/landing/loginPage.jpg"
              alt="Live from space album cover"
            />
          </Box>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30vw",
              bgcolor: "#FEBA32",
            }}
          >
            <Card sx={{ borderRadius: "10px" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" component="div">
                  Welcome to Landmark
                </Typography>
                <hr />
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="Email"
                    label="Email"
                    variant="standard"
                    size="small"
                    inputRef={emailRef}
                  />
                </Box>
                <br />
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="standard"
                    autoComplete="current-password"
                    size="small"
                    inputRef={passwordRef}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        login();
                      }
                    }}
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ bgcolor: "#194F59" }}
                  onClick={login}
                >
                  Login
                </Button>
              </CardActions>
            </Card>
          </CardContent>
        </Card>
      </Box>
    </>
  );

   function login() {
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    console.log(email);
    console.log(password);
     userJson.map(async (user) => {
      if (user.email.toLowerCase() == email && user.password == password) {
        const role = user.role;
        const idx = user.idx;

        const token = await callApi(email, password, role, +idx);
        console.log(token);
        localStorage.setItem("token",token);
        console.log(user.role);
        
        navigate("/" + user.role);
      }
    });

  }
  async function callApi(
    email: string,
    password: string,
    role: string,
    idx: number
  ) {
    const url = "http://localhost:3000/login";
    const body = {
      email: email,
      password: password,
      role: role,
      idx: idx,
    };
    const response = await axios.post(url, body);
    console.log(response.data);
    return response.data;
  }
}

export default LoginPage;
