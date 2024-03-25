/* eslint-disable @typescript-eslint/no-explicit-any */
import InfoIcon from "@mui/icons-material/Info";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dataUser from "../../dataUser.json";
import landmark from "../../landmark.json";

function UserPage() {
  const navigate = useNavigate();
  const itemData = landmark;
  let user: any;
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const url = "http://localhost:3000/authen";
    const token = {token:localStorage.getItem("token")}
    if(token){
      axios.post(url, token)
      .then(response => {
        setUserData(response.data);
      })
      .catch(() => {
        navigate('/')
      });
    }else{
      navigate('/')
    }
    
  }, [navigate]);
  if (!userData) {
    return <div>Loading...</div>;
  }
  dataUser.map((item) => {
    if (item.idx == userData.idx) {
      user = item;
      return;
    }
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "90vh",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 275,
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              bgcolor: "#194F59",
            }}
          >
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="98%"
            >
              <Box display={"flex"} alignItems={"center"} margin={1}>
                <Avatar
                  alt="Remy Sharp"
                  src={user!.img}
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <Box>
                  <Typography color={"white"} fontWeight={700} fontSize={24}>
                    {user!.name}
                  </Typography>
                  <Typography
                    color={"white"}
                    sx={{ color: "rgba(255,255,255,0.8)", marginTop: -1 }}
                  >
                    country : {user!.country}
                  </Typography>
                </Box>
              </Box>

              <Button variant="contained" color="warning" onClick={logOut}>
                Log Out
              </Button>
            </Stack>
          </Box>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "80vw",
              bgcolor: "#1C555E",
            }}
          >
            <ImageList sx={{ width: 900, height: 300 }} cols={2}>
              {itemData.map((item) => {
                if (item.country == user.country) {
                  return (
                    <ImageListItem key={item.img}>
                      <img src={item.img} alt={item.name} loading="lazy" />
                      <ImageListItemBar
                        title={item.name}
                        subtitle={item.country}
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.name}`}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  );
                } else {
                  return null;
                }
              })}
            </ImageList>
          </CardContent>
        </Card>
      </Box>
    </>
  );
  function logOut() {
    localStorage.clear();
    navigate("/");
  }
}

export default UserPage;
