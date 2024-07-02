import React, { useState, useEffect } from 'react';
import GetComments from './GetComments';
import PostComment from './PostComment';
import './App.css';

export default function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/comments')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);

  const handleCommentPosted = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <PostComment onCommentPosted={handleCommentPosted} />
      <GetComments comments={comments} />
    </div>
  );
}