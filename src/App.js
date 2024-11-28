import React, { useState, useEffect } from 'react';
import { createUser, createPost, fetchPosts } from './Apiservice';

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userForm, setUserForm] = useState({ name: '', email: '' });
  const [postForm, setPostForm] = useState({ title: '', content: '', userId: '' });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await fetchPosts();
    setPosts(data);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    await createUser(userForm);
    setUserForm({ name: '', email: '' });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    await createPost(postForm);
    setPostForm({ title: '', content: '', userId: '' });
    loadPosts();
  };

  return (
    <div>
      <h1>MongoDB Integration</h1>

      <h2>Add User</h2>
      <form onSubmit={handleUserSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={userForm.name}
          onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
        /> <br /><br />
        <input
          type="email"
          placeholder="Email"
          value={userForm.email}
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
        /><br /><br />
        <button type="submit">Add User</button><br />
      </form>

      <h2>Add Post</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={postForm.title}
          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
        /><br /><br />
        <textarea
          placeholder="Content"
          value={postForm.content}
          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
        /><br /><br />
        <input
          type="text"
          placeholder="User ID"
          value={postForm.userId}
          onChange={(e) => setPostForm({ ...postForm, userId: e.target.value })}
        /><br /><br />
        <button type="submit">Add Post</button>
      </form>

      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>By: {post.user.name} ({post.user.email})</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
