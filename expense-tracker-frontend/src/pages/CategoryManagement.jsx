import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

const CategoryManagement = () => {
  const [formData, setFormData] = useState({ name: '' });
  const { categories, categoriesLoading, categoriesError, fetchCategories, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/categories/', formData);
      toast.success('Category added successfully!');
      setFormData({ name: '' });
      await fetchCategories();
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.name?.[0] ||
        error.message ||
        'Unknown error';
      toast.error(`Failed to add category: ${errorMessage}`);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/categories/${id}/`);
      toast.success('Category deleted successfully!');
      await fetchCategories();
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || error.message || 'Unknown error';
      toast.error(`Failed to delete category: ${errorMessage}`);
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
          Manage Categories
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
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '25px',
        }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '1.1rem',
              color: '#2d3748',
            }}>
              Category Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter category name"
              onChange={handleChange}
              value={formData.name}
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
            Add Category
          </button>
        </form>
        <h3 style={{
          fontSize: '1.5rem',
          color: '#2d3748',
          marginBottom: '15px',
          fontWeight: '600',
        }}>
          Your Categories
        </h3>
        {!categoriesLoading && !categoriesError && categories.length === 0 ? (
          <p style={{
            fontSize: '1.1rem',
            color: '#4a5568',
            textAlign: 'center',
          }}>
            No categories found
          </p>
        ) : (
          <ul style={{
            listStyle: 'none',
            padding: '0',
            textAlign: 'left',
            maxHeight: '200px',
            overflowY: 'auto',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            backgroundColor: '#f8fafc',
          }}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                style={{
                  padding: '10px 15px',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
              >
                <span style={{ fontSize: '1rem', color: '#2d3748' }}>
                  {cat.name}
                </span>
                <button
                  onClick={() => handleDelete(cat.id)}
                  style={{
                    background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                  }}
                  onMouseOver={e => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.5)';
                  }}
                  onMouseOut={e => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)';
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
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
          h3 {
            font-size: 1.3rem;
          }
          input {
            padding: 8px;
            font-size: 0.9rem;
          }
          button {
            padding: 10px;
            font-size: 1rem;
          }
          ul {
            max-height: 150px;
          }
          li {
            padding: 8px 10px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryManagement;