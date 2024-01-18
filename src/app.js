import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000


app.use(express());
app.use(cors());

app.get("/", (req,res)=> {
    res.send("welcome to our webpage" )
})
app.get("/", (req,res) => {
    res.status(404)
    res.send("Page not found")
})
app.listen(PORT,async()=> {
    console.log(`Server is running on port:${PORT}`);
})