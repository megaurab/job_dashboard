import express from "express";
import jobRoutes from "./src/user/routes.js";
import env from "dotenv";
env.config();
const app = express();
const port = process.env.PORT_NUMBER;


app.use(express.json());

app.get("/",(req,res)=>{
    res.send("WELCOME TO THE JOB DASHBOARD!!");
})

app.use("/api/v1/job-dashboard",jobRoutes);

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})