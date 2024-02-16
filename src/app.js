import express from "express";
import cors from "cors";
import database from "./index/database.js"
import router from "./routes/index.js"
import bodyParser from "body-parser";

const app = express();
const PORT = 4000


app.use(express());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use ("/", router)

app.get("/", (req,res)=> {
    res.send("welcome to our webpage" )
})
app.get("/", (req,res) => {
    res.status(404).send("Page not found")
})
app.listen(PORT,async()=> {
    await database.connect();
    console.log(`Server is running on port:${PORT}`);
})