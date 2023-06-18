import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Firebase';
import '../styles/Login.css';

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Navigate to the landing page after successful login
      navigate('/landing');
    } catch (error) {
      console.log('Error logging in:', error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      // Navigate to the landing page after successful login with Google
      navigate('/landing');
    } catch (error) {
      console.log('Error logging in with Google:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Welcome to Gourmet Express</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label className="login-label" htmlFor="email">
          Email:
        </label>
        <input
          className="login-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="login-label" htmlFor="password">
          Password:
        </label>
        <input
          className="login-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">
          Login with Email
        </button>
      </form>
      <button className="login-button login-google-button" onClick={handleGoogleLogin}>
        Login with Google
      </button>
      <p className="login-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
