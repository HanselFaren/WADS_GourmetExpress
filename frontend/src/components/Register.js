import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Firebase';
import '../styles/Register.css';

const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // Redirect to login page after successful registration
      navigate('/');
    } catch (error) {
      console.log('Error registering user:', error);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      // Redirect to login page after successful registration
      navigate('/');
    } catch (error) {
      console.log('Error registering with Google:', error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <label className="register-label" htmlFor="email">
          Email:
        </label>
        <input
          className="register-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="register-label" htmlFor="password">
          Password:
        </label>
        <input
          className="register-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="register-button" type="submit">
          Register with Email
        </button>
      </form>
      <button className="register-button" onClick={handleGoogleRegister}>
        Register with Google
      </button>
      <p className="register-link">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;

