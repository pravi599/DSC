import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaUserTag } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'AR Requestor'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };
    try {
      setLoading(true);
      const response = await fetch('https://localhost:7117/api/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'AR Requestor'
        });
        navigate('/');
      } else {
        const errorText = await response.text();
        setError(`Registration failed: ${errorText}`);
      }
    } catch (error) {
      setError(`Error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-overlay"></div>
      <div className="auth-wrapper">
        <div className="auth-left">
          <h1>Join Document Similarity Comparison</h1>
          <p>Register to streamline your hiring process by comparing JDs with consultant resumes in seconds.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
          <h2>Register</h2>
          {error && <div className="auth-error">{error}</div>}

          <div className="input-group">
            <span className="input-icon"><FaUser /></span>
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><FaEnvelope /></span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <span className="input-icon input-eye" onClick={() => setShowPassword((v) => !v)} tabIndex={0} role="button" aria-label="Toggle password visibility">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <span className="input-icon input-eye" onClick={() => setShowConfirmPassword((v) => !v)} tabIndex={0} role="button" aria-label="Toggle confirm password visibility">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="input-group">
            <span className="input-icon"><FaUserTag /></span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="AR Requestor">AR Requestor</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? <span className="spinner"></span> : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
