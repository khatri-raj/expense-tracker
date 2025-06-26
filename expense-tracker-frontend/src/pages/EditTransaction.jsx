import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
  const { categories, categoriesLoading, categoriesError, logout, fetchCategories } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || isNaN(parseInt(id))) {
      setError('Invalid transaction ID');
      setLoading(false);
      toast.error('Invalid transaction ID');
      navigate('/dashboard');
      return;
    }

    const fetchTransaction = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/transactions/${id}/`);
        setFormData({
          type: response.data.type || '',
          category_id: response.data.category?.id || '',
          amount: response.data.amount || '',
          date: response.data.date || '',
          description: response.data.description || '',
        });
      } catch (error) {
        let errorMessage = error.response?.data?.detail || 'Failed to load transaction';
        if (error.response?.status === 404) {
          errorMessage = `Transaction with ID ${id} does not exist or you do not have permission.`;
          navigate('/dashboard');
        } else if (error.response?.status === 401) {
          logout();
          navigate('/login');
        }
        setError(errorMessage);
        toast.error(errorMessage);
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
      navigate('/dashboard');
      return;
    }
    if (parseFloat(formData.amount) <= 0) {
      toast.error('Amount must be positive');
      return;
    }
    if (!formData.category_id) {
      toast.error('Please select a category');
      return;
    }

    try {
      await api.put(`/api/transactions/${id}/`, formData);
      toast.success('Transaction updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      let errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.category_id?.[0] ||
        error.response?.data?.amount?.[0] ||
        'Failed to update transaction';
      if (error.response?.status === 404) {
        errorMessage = `Transaction with ID ${id} does not exist or you do not have permission.`;
        navigate('/dashboard');
      } else if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
      setError(errorMessage);
      toast.error(`Failed to update transaction: ${errorMessage}`);
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
        Loading transaction...
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
    <div
  style={{
    background: `url("/assets/expense-bg.png") no-repeat center center`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '60px',
    paddingBottom: '40px',
  }}
>
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
          Edit Transaction
        </h2>
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
              Type
            </label>
            <select
              name="type"
              onChange={handleChange}
              value={formData.type}
              required
              disabled={categoriesLoading || categoriesError}
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
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
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
              min="0.01"
              step="0.01"
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
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginTop: '20px',
          }}>
            <button
              type="submit"
              style={{
                padding: '12px 20px',
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
              Update Transaction
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '12px 20px',
                background: 'linear-gradient(45deg, #6b7280, #4b5563)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(107, 114, 128, 0.3)',
              }}
              onMouseOver={e => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.5)';
              }}
              onMouseOut={e => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 2px 8px rgba(107, 114, 128, 0.3)';
              }}
            >
              Cancel
            </button>
          </div>
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
            padding: 10px 15px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EditTransaction; 