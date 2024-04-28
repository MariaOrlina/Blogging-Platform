import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './write.css';
import { v4 as uuidv4 } from 'uuid';

export default function Write() {
  const [post, setPost] = useState({
    id: '',
    title: '',
    content: '',
    category: '',
  });

  const categories = [
    'Academic Resources', 'Career Services', 'Campus', 'Culture', 'Local Community Resources', 
    'Social', 'Sports', 'Health & Wellness', 'Technology', 'Travel', 'Alumni'
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { ...post, id: uuidv4() };
    const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
    localStorage.setItem('posts', JSON.stringify([...existingPosts, newPost]));
    setPost({ id: '', title: '', content: '', category: '' }); // Reset form
    navigate('/view'); // Redirect to view posts after submission
  };

  return (
    <div className="write">
      <img className="writeImg" src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input className="writeInput" placeholder="Title" type="text" autoFocus={true} name="title" value={post.title} onChange={handleChange} />
        </div>
        <div className="writeFormGroup">
          <textarea className="writeInput writeText" placeholder="Tell your story..." type="text" name="content" value={post.content} onChange={handleChange} />
        </div>
        <div className="writeFormGroup" style={{ marginTop: '20px' }}>
          <select className="writeSelect" name="category" value={post.category} onChange={handleChange} style={{ display: 'block', width: '70vw', padding: '10px', marginBottom: '20px' }}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  );
}
