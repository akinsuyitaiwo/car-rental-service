import express from "express";
import cors from "cors";
import database from "./index/database.js"

const app = express();
const PORT = 4000


app.use(express());
app.use(cors());

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