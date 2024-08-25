import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'

class CreatePost extends Component {
  state = {
    title: '',
    content: '',
    author: '',
    isRedirected: false,
    errorMsg: '',
  };

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeContent = (event) => {
    this.setState({ content: event.target.value });
  };

  onChangeAuthor = (event) => {
    this.setState({ author: event.target.value });
  };

  onSubmitSuccess = () => {
    this.setState({ isRedirected: true });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { title, content, author } = this.state;
    const token = Cookies.get('jwt_token');
    const postDetails = { title, content, author };
    const url = 'http://localhost:3002/posts'; // Update this URL to your backend endpoint

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postDetails),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        this.onSubmitSuccess();
      } else {
        const data = await response.json();
        this.onSubmitFailure(data.error_msg || 'Failed to create post');
      }
    } catch (error) {
      this.onSubmitFailure('An error occurred. Please try again.');
    }
  };

  back = ()=>{
    this.props.history.replace('/')
  }

  render() {
    const { title, content, author, isRedirected, errorMsg } = this.state;

    if (isRedirected) {
      return <Redirect to="/" />;
    }

    return (
      <div className="create-post-container">
        <h2>Create Post</h2>
        <form onSubmit={this.submitForm}>
          <div className="input-container">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={this.onChangeTitle}
              placeholder="Post Title"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={this.onChangeContent}
              placeholder="Post Content"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={this.onChangeAuthor}
              placeholder="Author Name"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Create Post
          </button>
          <button onClick={this.back} className='backBtn'>Back</button>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default CreatePost;
