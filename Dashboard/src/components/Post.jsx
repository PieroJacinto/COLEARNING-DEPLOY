import * as React from "react";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
} from "react-router-dom";

// import { getPost, getPosts } from "./api";

function Post() {
    const { id } = useParams();
    // const post = getPost(id);

    return (
        <div>
            <h1>holi</h1>
            {/* <h1>{post.title}</h1> */}
            {/* <p>{post.content}</p> */}
        </div>
    );
}

export default Post;