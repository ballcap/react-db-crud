import React, { useState } from 'react';

export default function PostComments({ onCommentPosted }) {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      chatname: username,
      chatcomment: comment,
    };

    try {
      const response = await fetch('https://node-db-crud.onrender.com/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });
      const result = await response.json();
      if (response.ok) {
        onCommentPosted(result);
        setUsername('');
        setComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <textarea
        placeholder="Comment"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>
      <button type="submit">POST</button>
    </form>
  );
}
