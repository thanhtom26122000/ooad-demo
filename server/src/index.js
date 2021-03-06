const express = require("express");
const app = express();
const port = 8080;
const multer = require("multer");
require('dotenv').config();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require('mongoose')
const cors = require("cors");
const path = require("path")
const apartmentRouter = require("./controllers/apartment");
const usersRouter = require("./controllers/user");
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const url = process.env.MONGO_URI
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url,)
    .then(console.log("xxxx connected"))
    .catch(err => console.log("err mongodb ", err))
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file, "xxx file")
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
app.use(multer({ storage: fileStorage }).any())
app.use("/api/apartment", apartmentRouter)
app.use("/api/user", usersRouter)
app.listen(process.env.PORT || port, () =>
    console.log(`Example app listening on port ${port}!`)
);
app.get("/images/:name", async (req, res) => {
    res.sendFile(path.join(process.cwd(), `/images/${req.params.name}`))
})