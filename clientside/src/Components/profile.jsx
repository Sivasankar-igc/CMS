import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Profile = () => {
    const [blog, setBlog] = useState();
    const [allBlogs, setAllBlogs] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const publish = () => {
        const blog_id = Date.now();
        setIsClicked(false)
        axios.post("http://localhost:8000/postBlog", { username, blog_id, blog })
            .then((res) => res.data == true ? location.reload() : window.alert("Something went wrong"))
            .catch((err) => console.error(err));

        document.getElementById("newPost").style.display = "none";
    }
    const username = useLocation().state.username;

    useEffect(() => {
        axios.post("http://localhost:8000/getBlogs", { username })
            .then((res) => res.data != "" ? setAllBlogs(res.data) : window.alert("Something went wrong"))
            .catch((err) => console.error(err));
    }, [])
    const deleteBlog = (id) => {
        axios.post("http://localhost:8000/deleteBlog", { username, id })
            .then((res) => res.data == true ? location.reload() : window.alert("Something went wrong"))
            .catch((err) => console.error(err));
    }
    return (
        <>
            <section className="blog-wrapper">
                <div className="header">
                    <div id="username">Username : {username}</div>
                    {!isClicked?<button onClick={() => {document.getElementById("newPost").style.display = "block";setIsClicked(true)}}>New Post</button>:<button onClick={() => publish()}>Post</button>}
                </div>
                <div id="newPost" style={{ display: "none" }}>
                    <input type="text" onChange={(e) => setBlog(e.target.value)} id="blog-field" placeholder="Enter you thought here"/>
                </div>
                <section className="blog-wrapper">

                    {
                        allBlogs != null ?
                            allBlogs.blogs.map((blog, index) => (

                                <div className="blog-box" key={index}>
                                    <div className="blog"><p>{blog.blog}</p></div>
                                    <div className="user__info"><p>Posted By {username}</p></div>
                                    <div className="like"><button onClick={() => deleteBlog(blog.blog_id)}>Delete</button></div>
                                </div>
                            ))
                            : <div style={{fontSize:"5vw", fontFamily:"verdana"}}>Nothing To Show Here.Please Post!!!</div>
                        
                    }
                </section>
                
            </section>
        </>
    )
}

export default Profile;