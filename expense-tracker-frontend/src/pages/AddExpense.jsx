import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [formData, setFormData] = useState({
    type: 'Expense',
    category_id: '',
    amount: '',
    date: '',
    description: '',
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/transactions/', formData);
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to add expense: ' + (error.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div>
      <div className="add-expense-container">
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit} className="add-expense-form">
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
            Add Expense
          </button>
        </form>
      </div>
      <style>{`
        .add-expense-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-radius: 8px;
          text-align: center;
        }
        .add-expense-form {
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
      `}</style>
    </div>
  );
};

export default AddExpense;