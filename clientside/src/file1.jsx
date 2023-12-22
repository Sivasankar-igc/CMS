import { useEffect, useState } from "react";
import axios from "axios";
// import img1 from "./images/17032549859861488525.jpg"

const File = () => {
    const [image, setImage] = useState();
    const [blogs, setBlogs] = useState();
    let data;

    useEffect(() => {
        axios.post("http://localhost:8000/getImages")
            .then((res) => {
                setBlogs(res.data);
                data=`./images/${res.data[0].image}`;
                console.log(data)
            })
            .catch((err) => console.error(err))
    }, [])

    const saveImage = async () => {
        const formData = new FormData();
        formData.append("image", image);
        const result = await axios.post("http://localhost:8000/saveImage", formData, { headers: { "Content-Type": "multipart/form-data" } })
    }
    return (
        <>
            <input type="file" name="image" id="imgId" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={() => saveImage()}>Save</button>
            {
                blogs ?
                    blogs.map((img, index) => {
                        return <img src={data} key={index} />
                    })
                    : ""
            }
        </>
    )
}

export default File;