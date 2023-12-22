const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/CMS")
    .then(() => console.log(`Database is connected`))
    .catch((err) => console.error(`Error occured while connecting to the database`));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: false,
        required: true
    },
    password: {
        type: String
    },
    blogs:[
        {
            blog_id:{type:String},
            blog:{type:String}
        }
    ]
})

const blogSchema = new mongoose.Schema({
    msg:{
        type:String
    },
    image:{
        type:String
    }
})

const accessSchema = new mongoose.Schema({
    userids:[]
})

const userCol = new mongoose.model("userCollection", userSchema);
const blogCol = new mongoose.model("blogCollection", blogSchema);
const accessCol = new mongoose.model("accessCollection", accessSchema);

module.exports = { userCol, blogCol, accessCol};