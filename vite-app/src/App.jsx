import React, { useEffect, useState } from "react";

export default function App() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const loadPost = async () => {
      const res = await fetch("https://forum.didan.id.vn/post/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjNzgzMTc0NS01MzAyLTQxN2QtYmJhOC03MDU1ZTYzNTRkOGYiLCJpYXQiOjE3MDk5MTQ5MjMsImV4cCI6MTcxMDAwMTMyM30.okJuljTtFsu1qN6HOSC9FPJmS28W-qnoQgDfYe5UBO4",
        },
      });
      if (!res.ok) {
        console.log("error");
      }
      const data = await res.json();
      setPost(data.data);
    };
    loadPost();
  }, []);
  console.log(post);
  return (
    <div>
      <ul>
        {post.map(p => <li key={p.postId}>
          <h1>{p.title}</h1>
          <p>{p.body}</p>
        </li>)}
      </ul>
    </div>
  );
}
