import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

const sections = [
  { title: 'Create Post', url: '/write' },
  { title: 'View Post', url: '/view-posts' },
  { title: 'Academic Resource', url: '/academic-resource' },
  { title: 'Career Services', url: '/career-services' },
  { title: 'Campus', url: '/campus' }, 
  { title: 'Culture', url: '/culture' },
  { title: 'Community Resources', url: '#' },
  { title: 'Social', url: '#' },
  { title: 'Sports', url: '#' },
  { title: 'Health & Wellness', url: '#' },
  { title: 'Technology', url: '#' },
  { title: 'Travel', url: '#' },
  { title: 'Alumni', url: '#' },
];

const mainFeaturedPost = {
  title: 'University Blogging Platform',
  description:
    "Welcome, One step to read and publish your work. Get appreciation and a chance to spread the word.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',

};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',

  },
];

const posts = [];

const sidebar = {
  title: 'About',
  description:
    'The go-to spot for inspiring travel stories, cutting-edge tech insights,easy and delicious recipes. Stay curious. Stay connected. Follow us on Social Media Platforms and become part of our community.',
  archives: [
    { title: 'March 2024', url: '#' },
    { title: 'February 2024', url: '#' },
    { title: 'January 2024', url: '#' },
    { title: 'Dcecember 2023', url: '#' },
   
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
          {/* Include only the MainFeaturedPost component */}
          <MainFeaturedPost post={mainFeaturedPost} />
          {/* Sidebar content will be visible */}
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
        </main>
      </Container>
      <Footer
        title="Thank you for visiting!"
        description="2024, Blogging Platform"
      />
    </ThemeProvider>
  );
}