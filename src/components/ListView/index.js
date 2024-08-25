import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

class ListView extends Component {
  state = {
    posts: [],
    errorMsg: '',
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    const token = Cookies.get('jwt_token');
    const url = 'http://localhost:3002/posts/';

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        this.setState({ posts: data });
      } else {
        this.setState({ errorMsg: 'Failed to fetch posts' });
      }
    } catch (error) {
      this.setState({ errorMsg: 'An error occurred. Please try again.' });
    }
  };

  renderPostList = () => {
    const { posts } = this.state;
    return posts.length === 0 ? (
      <p>No posts available. Create a new post!</p>
    ) : (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <Link to={`/posts/${post.id}`} className="post-link">View Details</Link>
          </li>
        ))}
      </ul>
    );
  };

  logout = ()=>{
    Cookies.remove("jwt_token")
    this.props.history.replace('/login')
  }

  render() {
    const { errorMsg } = this.state;

    return (
      <div className='listViewContainer'>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <div>
              <Link to="/createpost" className="nav-link">Create Post</Link>
              <button onClick={this.logout} className='logout'>Logout</button>
          </div>
        </nav>
        <main className='listCard'>
          {errorMsg ? <p className="error-message">{errorMsg}</p> : this.renderPostList()}
        </main>
        <footer>
          <p>&copy; 2024 Your Blog Application</p>
        </footer>
      </div>
    );
  }
}

export default ListView;
