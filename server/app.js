
const express = require("express");
const app = express();
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const mongoose = require("mongoose")
const port = 3001
require('dotenv').config()

const dburl = process.env.DB_URL

mongoose.connect(dburl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => { console.log("db connected") }).catch((err) => { console.log(err); })


app.get("/", (req, res) => {
    res.status(201).json("server created")
});

app.use(express.json());
// app.use(cookiParser());
app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log(`server start at port no : ${port}`);
})