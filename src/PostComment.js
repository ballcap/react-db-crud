import React, { useState } from 'react';
import style from './PostComment.module.css';

export default function PostComments({ onCommentPosted }) {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for button disabled status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button on submit
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
    } finally {
      setIsSubmitting(false); // Re-enable button after submission is complete
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
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
      <button type="submit" disabled={isSubmitting}>POST</button>
    </form>
  );
}
