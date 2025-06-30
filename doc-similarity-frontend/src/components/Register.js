import React, { useState } from 'react';
import './LoginRegister.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'AR Requestor'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
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
        const result = await response.text();
        alert(`${result}`);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'AR Requestor'
        });
      } else {
        const errorText = await response.text();
        alert(`Registration failed: ${errorText}`);
      }
    } catch (error) {
      alert(`Error occurred: ${error.message}`);
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
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="AR Requestor">AR Requestor</option>
            <option value="Recruiter">Recruiter</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
