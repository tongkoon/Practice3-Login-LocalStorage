import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { verify } from "jsonwebtoken";
import { generateToken, secret } from "./jwtToken";

export const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.text());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.post("/login",(req,res)=>{
  const body = req.body
  const token = generateToken(body,secret)
  res.send(token)
})

app.post("/authen",(req,res)=>{
  const token = req.body.token
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data:any = verify(token,secret)

  res.json(data)
})


