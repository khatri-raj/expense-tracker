import { useState } from 'react';
import api from '../api/axiosConfig';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password1: '',
    new_password2: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/change_password/', formData);
      alert('Password changed successfully!');
    } catch (error) {
      alert('Password change failed: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div>
      <div className="change-password-container">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label>Old Password</label>
            <input
              name="old_password"
              type="password"
              placeholder="Old Password"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              name="new_password1"
              type="password"
              placeholder="New Password"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              name="new_password2"
              type="password"
              placeholder="Confirm New Password"
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="btn">
            Change Password
          </button>
        </form>
      </div>
      <style>{`
        .change-password-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-radius: 8px;
          text-align: center;
        }
        .change-password-form {
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

export default ChangePassword;