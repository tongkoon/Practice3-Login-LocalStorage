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
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import dataUser from "../../dataUser.json";
import dataLandmark from "../../landmark.json";
function UserPage() {
  const navigate = useNavigate();
  const [itemData, setItemData]: any = useState(dataLandmark);
  const [btnUser, setbtnUser] = useState<string>("gray");
  const [btnLandmark, setbtnLandmark] = useState<string>("green");
  let user: any;
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const url = "http://localhost:3000/authen";
    const token = {token:localStorage.getItem("token")}
     
    axios.post(url, token)
      .then(response => {
        console.log(response.data);
        setUserData(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
                  src={user!.avatar}
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <Box>
                  <Typography color={"white"} fontWeight={700} fontSize={24}>
                    {user!.name}
                  </Typography>
                </Box>
              </Box>

              <Button variant="contained" color="warning" onClick={logOut}>
                Log Out
              </Button>
            </Stack>
          </Box>

          <Box sx={{ bgcolor: "#194F59" }}>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: btnUser }}
              onClick={() => {
                changeMenu("user");
              }}
            >
              Show all users
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ marginLeft: 2, bgcolor: btnLandmark }}
              onClick={() => {
                changeMenu("landmark");
              }}
            >
              Show all landmarks
            </Button>
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
              {itemData.map(
                (item: {
                  img: string;
                  name: string;
                  country:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                }) => {
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
                }
              )}
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

  function changeMenu(menu: string) {
    if (menu == "user") {
      setItemData(dataUser);
      setbtnUser("green");
      setbtnLandmark("gray");
    } else {
      setItemData(dataLandmark);
      setbtnUser("gray");
      setbtnLandmark("green");
    }
    console.log(menu);
  }
}

export default UserPage;
