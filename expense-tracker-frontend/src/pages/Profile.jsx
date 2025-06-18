import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

const Profile = () => {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/profile/');
        setFormData({
          username: response.data.username || '',
          email: response.data.email || '',
        });
      } catch (error) {
        const errorMessage = error.response?.data?.detail || 'Failed to load profile';
        setError(errorMessage);
        toast.error(errorMessage);
        if (error.response?.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [logout, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/api/profile/', formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Unknown error';
      toast.error(`Update failed: ${errorMessage}`);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  if (loading) {
    return (
      <div style={{
        color: '#3b82f6',
        margin: '20px',
        fontSize: '1.2rem',
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-out',
      }}>
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        color: '#721c24',
        margin: '20px',
        fontSize: '1.2rem',
        textAlign: 'center',
        backgroundColor: '#f8d7da',
        padding: '15px',
        borderRadius: '6px',
        animation: 'fadeIn 0.5s ease-out',
      }}>
        {error}{' '}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            marginLeft: '10px',
            padding: '8px 16px',
            background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={e => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.5)';
          }}
          onMouseOut={e => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

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
        onMouseOver={e => {
          e.target.style.color = '#4a5568';
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseOut={e => {
          e.target.style.color = '#2d3748';
          e.target.style.transform = 'scale(1)';
        }}>
          Update Profile
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
              value={formData.username}
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
              value={formData.email}
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
          <button
            type="submit"
            style={{
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
            }}
          >
            Update Profile
          </button>
        </form>
      </div>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

export default Profile;