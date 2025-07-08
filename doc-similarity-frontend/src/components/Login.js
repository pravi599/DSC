import React, { useState } from 'react';
import './LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      id: 0,
      name: '',
      role: '',
      email: email,
      password: password
    };

    try {
      setLoading(true);
      const response = await fetch('https://localhost:7117/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', result.email)
        localStorage.setItem('userRole', result.role || '');
        if (result.role === 'AR Requestor') {
          navigate('/dashboard');
        } else if (result.role === 'Recruiter') {
          navigate('/recruiter');
        } else {
          navigate('/dashboard');
        }
      } else {
        const errorText = await response.text();
        setError(`Login failed: ${errorText}`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-overlay"></div>
      <div className="auth-wrapper">
        <div className="auth-left">
          <h1>Welcome to Document Similarity Comparison</h1>
          <p>
            Effortlessly match job descriptions with consultant profiles.
            Streamline your recruitment process with precision and AI assistance.
          </p>
        </div>
        <form className="auth-form" onSubmit={handleLogin} autoComplete="on">
          <h2>Login</h2>
          {error && <div className="auth-error">{error}</div>}
          <div className="input-group">
            <span className="input-icon"><FaEnvelope /></span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <span
              className="input-icon input-eye"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>
          <p className="register-prompt">
            If not registered, <Link to="/register">register here</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
