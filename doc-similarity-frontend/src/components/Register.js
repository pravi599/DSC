import React, { useState } from 'react'; 
import './LoginRegister.css';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'AR Requestor' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration successful (mock)! Name: ${formData.name}, Email: ${formData.email}, Role: ${formData.role}`);
    // You can send formData to your backend or handle accordingly
  };

  return (
    <div className="auth-container">
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
  );
}

export default Register;
