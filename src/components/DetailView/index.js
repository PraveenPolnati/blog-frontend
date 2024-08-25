import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'

class DetailView extends Component {
  state = {
    post: null,
    isLoading: true,
    error: '',
    redirectToList: false,
  };

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost = async () => {
    const { id } = this.props.match.params;
    const url = `http://localhost:3002/posts/${id}`;
    const token = Cookies.get('jwt_token');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        this.setState({ post: data, isLoading: false });
      } else {
        this.setState({ error: 'Failed to fetch post', isLoading: false });
      }
    } catch (error) {
      this.setState({ error: 'An error occurred', isLoading: false });
    }
  };

  deletePost = async () => {
    const { id } = this.props.match.params;
    const url = `http://localhost:3002/posts/${id}`;
    const token = Cookies.get('jwt_token');
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        this.setState({ redirectToList: true });
      } else {
        this.setState({ error: 'Failed to delete post' });
      }
    } catch (error) {
      this.setState({ error: 'An error occurred' });
    }
  };

  back = ()=>{
    this.props.history.replace('/')
  }

  render() {
    const { post, isLoading, error, redirectToList } = this.state;

    if (redirectToList) {
      return <Redirect to="/" />;
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div className='card'>
        <div className='postView'>
          <h1>Post Details</h1>
          {post ? (
            <div>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={this.deletePost} className="delete-button">Delete Post</button>
              <button onClick={this.back} className='backBtn'>Back</button>
            </div>
          ) : (
            <p>Post not found</p>
          )}
        </div>
      </div>
    );
  }
}

export default DetailView;
