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
      setError(errorMessage);
      toast.error(`Failed to add income: ${errorMessage}`);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
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
        onMouseOver={e => {
          e.target.style.color = '#4a5568';
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseOut={e => {
          e.target.style.color = '#2d3748';
          e.target.style.transform = 'scale(1)';
        }}>
          Add Income
        </h2>
        {error && (
          <div style={{
            color: '#721c24',
            marginBottom: '15px',
            fontSize: '1.1rem',
            backgroundColor: '#f8d7da',
            padding: '10px',
            borderRadius: '6px',
            animation: 'fadeIn 0.5s ease-out',
          }}>
            {error}
          </div>
        )}
        {categoriesLoading && (
          <div style={{
            color: '#3b82f6',
            marginBottom: '15px',
            fontSize: '1.1rem',
            animation: 'fadeIn 0.5s ease-out',
          }}>
            Loading categories...
          </div>
        )}
        {categoriesError && (
          <div style={{
            color: '#721c24',
            marginBottom: '15px',
            fontSize: '1.1rem',
            backgroundColor: '#f8d7da',
            padding: '10px',
            borderRadius: '6px',
            animation: 'fadeIn 0.5s ease-out',
          }}>
            {categoriesError}{' '}
            <button
              onClick={fetchCategories}
              style={{
                color: '#3b82f6',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={e => e.target.style.color = '#2563eb'}
              onMouseOut={e => e.target.style.color = '#3b82f6'}
            >
              Retry
            </button>
          </div>
        )}
        {!categoriesLoading && !categoriesError && categories.length === 0 && (
          <div style={{
            color: '#721c24',
            marginBottom: '15px',
            fontSize: '1.1rem',
            backgroundColor: '#f8d7da',
            padding: '10px',
            borderRadius: '6px',
            animation: 'fadeIn 0.5s ease-out',
          }}>
            No categories available.{' '}
            <Link to="/categories" style={{
              color: '#3b82f6',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseOver={e => e.target.style.color = '#2563eb'}
            onMouseOut={e => e.target.style.color = '#3b82f6'}>
              Add a category
            </Link> first.
          </div>
        )}
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
              Category
            </label>
            <select
              name="category_id"
              onChange={handleChange}
              value={formData.category_id}
              required
              disabled={categoriesLoading || categoriesError || categories.length === 0}
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
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '1.1rem',
              color: '#2d3748',
            }}>
              Amount
            </label>
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              onChange={handleChange}
              value={formData.amount}
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
              Date
            </label>
            <input
              name="date"
              type="date"
              onChange={handleChange}
              value={formData.date}
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
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: '#f8fafc',
                resize: 'vertical',
                minHeight: '80px',
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
              background: 'linear-gradient(45deg, #28a745, #20c997)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)',
            }}
            onMouseOver={e => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.5)';
            }}
            onMouseOut={e => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 2px 8px rgba(40, 167, 69, 0.3)';
            }}
          >
            Add Income
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
          input, select, textarea {
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

export default AddIncome;