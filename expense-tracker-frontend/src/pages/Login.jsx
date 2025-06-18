import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/token/', formData);
      login(response.data.access, response.data.refresh);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data);
      const errorMessage = error.response?.data?.detail || 'Unknown error';
      toast.error(`Login failed: ${errorMessage}`);
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
          Login
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
            Login
          </button>
        </form>
        <p style={{
          marginTop: '15px',
          fontSize: '1rem',
          color: '#4a5568',
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: '#3b82f6',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseOver={e => e.target.style.color = '#2563eb'}
          onMouseOut={e => e.target.style.color = '#3b82f6'}>
            Register
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

export default Login;