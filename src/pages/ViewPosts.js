import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardActions, Typography, Button, TextField } from '@mui/material';

function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState({}); // Object to hold comments for each post

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts); // Update local state
  };

  const handleCommentChange = (e, postId) => {
    setComment({ ...comment, [postId]: e.target.value });
  };

  const handleSubmitComment = (postId) => {
    if (!comment[postId]) return; // Prevent adding empty comments

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments ? [...post.comments, comment[postId]] : [comment[postId]];
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts); // Update local state
    setComment({ ...comment, [postId]: '' }); // Clear the comment input field
  };

  return (
    <Grid container spacing={4} style={{ padding: '20px' }}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card variant="outlined" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom style={{ marginTop: '20px' }}>
                Category: {post.category}
              </Typography>
              {post.comments && post.comments.map((comment, index) => (
                <Typography key={index} variant="body2" style={{ marginTop: '10px' }}>
                  Comment: {comment}
                </Typography>
              ))}
            </CardContent>
            <CardActions>
              <TextField
                size="small"
                label="Comment"
                variant="outlined"
                value={comment[post.id] || ''}
                onChange={(e) => handleCommentChange(e, post.id)}
              />
              <Button size="small" color="primary" onClick={() => handleSubmitComment(post.id)}>
                Submit
              </Button>
              <Button size="small" color="secondary" onClick={() => handleDelete(post.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ViewPosts;
