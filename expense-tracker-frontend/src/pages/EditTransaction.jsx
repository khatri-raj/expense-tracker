import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

const EditTransaction = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    type: '',
    category_id: '',
    amount: '',
    date: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categories, categoriesLoading, categoriesError, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || isNaN(parseInt(id))) {
      setError('Invalid transaction ID');
      setLoading(false);
      toast.error('Invalid transaction ID');
      return;
    }

    const fetchTransaction = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/transactions/${id}/`);
        console.log('Fetched transaction:', response.data); // Debug
        setFormData({
          type: response.data.type || '',
          category_id: response.data.category?.id || '',
          amount: response.data.amount || '',
          date: response.data.date || '',
          description: response.data.description || '',
        });
      } catch (error) {
        console.error('Error fetching transaction:', error.response || error);
        const errorMessage =
          error.response?.data?.detail || 'Failed to load transaction';
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

    fetchTransaction();
  }, [id, logout, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || isNaN(parseInt(id))) {
      toast.error('Invalid transaction ID');
      return;
    }
    if (parseFloat(formData.amount) <= 0) {
      toast.error('Amount must be positive');
      return;
    }

    // Temporary: Use fetch to bypass axios interceptors for debugging
    try {
      const url = `http://localhost:8000/api/transactions/${id}/`;
      console.log('Sending fetch PUT:', { url, data: formData }); // Debug
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      console.log('Fetch response:', { status: response.status, data: responseData }); // Debug
      if (!response.ok) {
        throw new Error(
          responseData.detail ||
            responseData.non_field_errors?.[0] ||
            responseData.category_id?.[0] ||
            responseData.amount?.[0] ||
            'Failed to update transaction'
        );
      }
      toast.success('Transaction updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Fetch error:', error.message, error); // Debug
      toast.error(`Failed to update transaction: ${error.message}`);
      if (error.message.includes('Unauthorized') || error.message.includes('401')) {
        logout();
        navigate('/login');
      }
    }

    // Uncomment to revert to axios after confirming fetch works
    /*
    try {
      const url = `/api/transactions/${id}/`;
      console.log('Sending axios PUT:', { url, data: formData }); // Debug
      const response = await api.put(url, formData);
      console.log('Axios response:', response.data); // Debug
      toast.success('Transaction updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Axios error updating transaction:', error.response || error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.category_id?.[0] ||
        error.response?.data?.amount?.[0] ||
        'Failed to update transaction';
      toast.error(`Failed to update transaction: ${errorMessage}`);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
    */
  };

  if (loading) {
    return <div className="loading-message">Loading transaction...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error} <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div>
      <div className="edit-transaction-container">
        <h2>Edit Transaction</h2>
        {categoriesLoading && <div className="loading-message">Loading categories...</div>}
        {categoriesError && (
          <div className="error-message">
            {categoriesError} <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="edit-transaction-form">
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              onChange={handleChange}
              value={formData.type}
              required
              className="form-input"
              disabled={categoriesLoading || categoriesError}
            >
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
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
              min="0.01"
              step="0.01"
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
          <div className="form-actions">
            <button type="submit" className="btn">
              Update Transaction
            </button>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .edit-transaction-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-radius: 8px;
          text-align: center;
        }
        .edit-transaction-form {
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
        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
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
        .cancel-btn {
          background-color: #6c757d;
        }
        .cancel-btn:hover {
          background-color: #5a6268;
        }
        .loading-message {
          color: blue;
          margin: 20px;
          font-size: 16px;
          text-align: center;
        }
        .error-message {
          color: red;
          margin: 20px;
          font-size: 14px;
          text-align: center;
        }
        .error-message button {
          margin-left: 10px;
          padding: 5px 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default EditTransaction;