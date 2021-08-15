const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const catRouter = require('./routes/categorys');
const multer = require("multer");
const path = require("path")

dotenv.config();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname,"/images")))
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(console.log('connected to mongodb'))
.catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, "images")
    }, filename: (req,file,cb) =>{
        cb(null, req.body.name);
    },
})


const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("file da duoc upload");
})
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/category", catRouter)


app.listen("5000", ()=>{
    console.log("backend is running")
})