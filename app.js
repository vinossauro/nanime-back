const express = require("express");
const app = express();
const port = 3000;
const dbcontroller = require("./dbcontroller");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const UserRouter = require("./routes/user")
app.use("/user", bodyParser.json(),UserRouter)

const AnimeRouter = require("./routes/anime");
app.use("/anime", bodyParser.json(),  AnimeRouter)


app.listen(port, async () => {
    await dbcontroller.connectDatabase()
    console.log("Listening");
});
