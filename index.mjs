import express from "express";
import cors from "cors";
import multer from "multer";
import { userCol, blogCol, accessCol } from "./database.js";

const web = express();
const PORT = process.env.PORT || 8000;

web.use(express.json());
web.use(express.urlencoded({ extended: false }));
web.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./clientside/src/Components/images");
    },
    filename: function (req, file, cb) {
        const uniqueIndex = Date.now();
        cb(null, uniqueIndex + file.originalname);
    }
})
const upload = multer({ storage: storage });

web.post("/saveImage", upload.single("image"), async (req, res) => {
    try {
        const image = req.file.filename;
        const data = new blogCol({
            msg: "helo",
            image: image
        })
        await data.save()
    } catch (error) {
        console.error(`error occured while posting the blogs =>>> ${error}`)
    }
})

web.post("/getImages", async (req, res) => {
    try {
        const images = await blogCol.find({});
        console.log(images);
        images != null ? res.status(200).send(images) : res.status(200).send(null)
    } catch (error) {
        console.error(`error occured while getting the blogs =>>> ${error}`)
    }
})

web.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = new userCol({
            username: username,
            password: password
        })
        await data.save();
        const data1 = await userCol.findOne({ username: username });
        data1 != null ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(error);
    }
})
web.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const data = await userCol.findOne({ username: username });
        data != null ? res.status(200).send(true) : res.status(200).send(false)
    } catch (error) {
        console.error(error);
    }
})
web.post("/postBlog", async (req, res) => {
    try {
        const { username, blog_id, blog } = req.body;
        const data = await userCol.updateOne({ username: username }, { $push: { blogs: { blog_id: blog_id, blog: blog } } })
        data.modifiedCount == 1 ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(error);
    }
})
web.post("/getBlogs", async (req, res) => {
    try {
        const { username } = req.body;
        const data = await userCol.findOne({ username: username })
        data != null ? res.status(200).send(data) : res.status(200).send(null)
    } catch (error) {
        console.error(error);
    }
})
web.post("/deleteBlog", async (req, res) => {
    try {
        const { username, id } = req.body;
        const data = await userCol.updateOne({ username: username }, { $pull: { blogs: { blog_id: id } } })
        data.modifiedCount == 1 ? res.status(200).send(true) : res.status(200).send(false);
    } catch (error) {
        console.error(error);
    }
})
web.post("/getAllBlogs", async (req, res) => {
    try {
        const data = await userCol.find({})
        data != null ? res.status(200).send(data) : res.status(200).send(null);
    } catch (error) {
        console.error(error)
    }
})
web.listen(PORT, () => console.log(`Server is running at port number ${PORT}`))