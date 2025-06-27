import React, { useState } from 'react';
import './LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      id: 0, // As per your curl, though probably unnecessary
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
        const result = await response.json(); // Assuming API returns user info
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', result.role || ''); // Save role if returned

        // Navigate based on role
        if (result.role === 'AR Requestor') {
          navigate('/dashboard');
        } else if (result.role === 'Recruiter') {
          navigate('/recruiter');
        } else {
          navigate('/dashboard'); // Fallback
        }

        alert('Login successful!');
      } else {
        const errorText = await response.text();
        alert(`Login failed: ${errorText}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-wrapper">
        <div className="auth-left">
          <h1>Welcome to Document Similarity Comparison</h1>
          <p>Effortlessly match job descriptions with consultant profiles. Streamline your recruitment process with precision.</p>
        </div>
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
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
