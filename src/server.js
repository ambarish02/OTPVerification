// server.js
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import routes from "./routes.js";

const app = express();
const port = 4000;
const connUrl = "mongodb://127.0.0.1:27017"; 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection
let db;
MongoClient.connect(connUrl)
  .then((client) => {
    db = client.db("SingUp"); 
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));


app.use((req, res, next) => {
  req.db = db;
  next();
});


app.use("/api", routes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
