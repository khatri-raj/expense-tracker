import { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

const AddIncome = () => {
  const [formData, setFormData] = useState({
    type: 'Income',
    category_id: '',
    amount: '',
    date: '',
    description: '',
  });
  const { categories, categoriesLoading, categoriesError, logout, fetchCategories } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/transactions/', formData);
      toast.success('Income added successfully!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Unknown error';
      toast.error('Failed to add income: ' + errorMessage);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  return (
    <div>
      <div className="add-income-container">
        <h2>Add Income</h2>
        {error && <div className="error-message">{error}</div>}
        {categoriesLoading && <div className="loading-message">Loading categories...</div>}
        {categoriesError && (
          <div className="error-message">
            {categoriesError} <button onClick={fetchCategories}>Retry</button>
          </div>
        )}
        {!categoriesLoading && !categoriesError && categories.length === 0 && (
          <div className="error-message">
            No categories available. <Link to="/categories">Add a category</Link> first.
          </div>
        )}
        <form onSubmit={handleSubmit} className="add-income-form">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category_id"
              onChange={handleChange}
              value={formData.category_id}
              required
              className="form-input"
              disabled={categoriesLoading || categoriesError || categories.length === 0}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              onChange={handleChange}
              value={formData.amount}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              name="date"
              type="date"
              onChange={handleChange}
              value={formData.date}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
              className="form-textarea"
            ></textarea>
          </div>
          <button type="submit" className="btn">
            Add Income
          </button>
        </form>
      </div>
      <style>{`
        .add-income-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-radius: 8px;
          text-align: center;
        }
        .add-income-form {
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
        .form-input, .form-textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        .form-textarea {
          resize: vertical;
          min-height: 80px;
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
        .error-message, .loading-message {
          color: red;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .loading-message {
          color: blue;
        }
      `}</style>
    </div>
  );
};

export default AddIncome;