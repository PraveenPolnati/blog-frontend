import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    showSubmitError: false,
    errorMsg: '',
    registrationSuccess: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  onSubmitSuccess = () => {
    this.setState({ registrationSuccess: true });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.onSubmitFailure('Passwords do not match');
      return;
    }

    const userDetails = { username, password };
    const url = 'http://localhost:3002/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        this.onSubmitSuccess();
      } else {
        const data = await response.json();
        this.onSubmitFailure(data.error_msg || 'Registration failed');
      }
    } catch (error) {
      this.onSubmitFailure('An error occurred. Please try again.');
      console.log(error)
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          required
        />
      </div>
    );
  };

  renderConfirmPasswordField = () => {
    const { confirmPassword } = this.state;
    return (
      <div className="input-container">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          className="input-field"
          value={confirmPassword}
          onChange={this.onChangeConfirmPassword}
          placeholder="Confirm Password"
          required
        />
      </div>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <div className="input-container">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
          required
        />
      </div>
    );
  };

  login = ()=>{
    this.props.history.replace('/login')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken) {
      return <Redirect to="/" />;
    }
    const { showSubmitError, errorMsg, registrationSuccess } = this.state;
    if (registrationSuccess) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="register-form-container">
        <h2>Register</h2>
        <form className="form-container" onSubmit={this.submitForm}>
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          {this.renderConfirmPasswordField()}
          <button type="submit" className="submit-button">
            Register
          </button>
          <button onClick={this.login} type='button' className='loginBtn'>
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
