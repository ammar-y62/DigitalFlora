import PostEditor from "./PostEditor";
import React from "react";

export const NewPostPage = () => {
    return (
        <>
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <h4>Make a post! </h4>
        </div>
        <PostEditor/>
        </>
    )
};