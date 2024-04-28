import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Container } from '@mui/material';

function AcademicResource() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    // Ensure the filter matches exactly the category name used in the Write component
    const academicPosts = storedPosts.filter(post => post.category === 'Academic Resources');
    setPosts(academicPosts);
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom style={{ margin: '20px 0' }}>
        All Academic Research Related Posts Are Available Here
      </Typography>
      <Grid container spacing={4} style={{ padding: '20px' }}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AcademicResource;
