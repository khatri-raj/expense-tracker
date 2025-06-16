import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const Profile = () => {
  const [formData, setFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/profile/');
        setFormData({
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/api/profile/', formData);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Update failed: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div>
      <div className="profile-container">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="btn">
            Update Profile
          </button>
        </form>
      </div>
      <style>{`
        .profile-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-radius: 8px;
          text-align: center;
        }
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .form-group {
          text-align: left;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .form-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        .btn {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Profile;