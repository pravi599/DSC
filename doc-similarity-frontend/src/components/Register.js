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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert(`Registration successful (mock)! Name: ${formData.name}, Email: ${formData.email}, Role: ${formData.role}`);
    // TODO: Send formData to backend or process further
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
