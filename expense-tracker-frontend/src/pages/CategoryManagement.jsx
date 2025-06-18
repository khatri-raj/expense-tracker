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
    console.log('CategoryManagement useEffect: Fetching categories'); // Debug
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
      console.error('Delete error:', error.response || error); // Debug
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
      }
    }
  };

  return (
    <div>
      <div className="category-container">
        <h2>Manage Categories</h2>
        {categoriesLoading && <div className="loading-message">Loading categories...</div>}
        {categoriesError && (
          <div className="error-message">
            {categoriesError} <button onClick={fetchCategories}>Retry</button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label>Category Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter category name"
              onChange={handleChange}
              value={formData.name}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="btn">Add Category</button>
        </form>
        <h3>Your Categories</h3>
        {!categoriesLoading && !categoriesError && categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <ul className="category-list">
            {categories.map((cat) => (
              <li key={cat.id}>
                {cat.name}
                <button onClick={() => handleDelete(cat.id)} className="delete-btn">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <style>{`
        .category-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border-radius: 8px;
          text-align: center;
        }
        .category-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
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
        .category-list {
          list-style: none;
          padding: 0;
          text-align: left;
        }
        .category-list li {
          padding: 8px;
          border-bottom: 1px solid #eee;
        }
        .delete-btn {
          margin-left: 10px;
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-btn:hover {
          background-color: #c82333;
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

export default CategoryManagement;