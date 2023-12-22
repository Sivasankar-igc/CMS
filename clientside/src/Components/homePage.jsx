import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/homePage.css";
import "../CSS/navigation.css";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
    const username = useLocation().state.username;
    const nav = useNavigate();
    const [allBlogs, setAllBlogs] = useState(null);

    useEffect(() => {
        axios.post("http://localhost:8000/getAllBlogs")
            .then((res) => res.data != "" ? setAllBlogs(res.data) : window.alert("Something went wrong"))
            .catch((err) => console.error(err));
    }, [])

    const like = () => {

    }
    const dislike = () => {

    }
    return (
        <>
            <section className="wrapper">
                <section className="nav__wrapper">
                    <div>
                        <ul id="hamburger-menu" style={{ display: "none" }}>
                            <li>
                                <div></div>
                            </li>
                            <li>
                                <div></div>
                            </li>
                            <li>
                                <div></div>
                            </li>
                        </ul>
                        <ul id="navbar" >
                            <li><a onClick={() => nav("/profile", { state: { username: username } })}>Profile</a></li>
                        </ul>
                    </div>
                </section>
                <section className="blog-wrapper">
                    <section className="blog-wrapper">

                        {
                            allBlogs != null ?
                                allBlogs.map((blog) => (
                                    blog.blogs.map((i, index) => (
                                        <div className="blog-box" key={i.blog_id}>
                                            <div className="blog"><p>{i.blog}</p></div>
                                            <div className="user__info"><p>Posted By {blog.username}</p></div>
                                            <div className="like"><button onClick={() => like()}>Like</button><button onClick={() => dislike(blog.blog_id)}>Dislike</button></div>
                                        </div>
                                    ))
                                    // console.log(blog)
                                ))
                                : ""
                        }
                    </section>
                </section>
            </section>
        </>
    )
}

export default HomePage;