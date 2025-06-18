import { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom'; // Add Link
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

const AddIncome = () => {
  const [formData, setFormData] = useState({
    type: 'Income',
    category: '',
    amount: '',
    date: '',
    description: '',
  });
  const { categories, logout } = useAuth();
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
        navigate('/login'); // Navigate on 401
      }
    }
  };

  return (
    <div>
      <div className="add-income-container">
        <h2>Add Income</h2>
        {error && <div className="error-message">{error}</div>}
        {categories.length === 0 && !error && (
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
            >
              <option value="">Select Category</option>
              {categories.length === 0 ? (
                <option disabled>No categories available</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
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
      {/* Styles unchanged */}
    </div>
  );
};

export default AddIncome;