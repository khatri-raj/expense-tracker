import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/signup/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      const errorMessage = error.response?.data?.detail || JSON.stringify(error.response?.data) || 'Unknown error';
      toast.error(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <div>
      <div style={{
        maxWidth: '400px',
        margin: '80px auto',
        padding: '25px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        borderRadius: '10px',
        textAlign: 'center',
        animation: 'slideIn 0.6s ease-out',
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#2d3748',
          marginBottom: '20px',
          fontWeight: '700',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={e => e.target.style.color = '#4a5568'}
        onMouseOut={e => e.target.style.color = '#2d3748'}>
          Register
        </h2>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '1.1rem',
              color: '#2d3748',
            }}>
              Username
            </label>
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: '#f8fafc',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 8px rgba(59, 130, 246, 0.3)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '1.1rem',
              color: '#2d3748',
            }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: '#f8fafc',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 8px rgba(59, 130, 246, 0.3)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '1.1rem',
              color: '#2d3748',
            }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: '#f8fafc',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 8px rgba(59, 130, 246, 0.3)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <button type="submit" style={{
            padding: '12px',
            background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
          }}
          onMouseOver={e => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.5)';
          }}
          onMouseOut={e => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
          }}>
            Register
          </button>
        </form>
        <p style={{
          marginTop: '15px',
          fontSize: '1rem',
          color: '#4a5568',
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: '#3b82f6',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseOver={e => e.target.style.color = '#2563eb'}
          onMouseOut={e => e.target.style.color = '#3b82f6'}>
            Login
          </Link>
        </p>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 768px) {
          div[style*="maxWidth: 400px"] {
            margin: 60px 15px;
            padding: 15px;
          }
          h2 {
            font-size: 1.8rem;
          }
          input {
            padding: 8px;
            font-size: 0.9rem;
          }
          button {
            padding: 10px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;