import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import { useAuth } from '../components/AuthContext';

const CategoryManagement = () => {
  const [formData, setFormData] = useState({ name: '' });
  const { categories, fetchCategories, logout } = useAuth();
  const navigate = useNavigate(); // Use navigate here

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
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.name?.[0] || 
                          error.message || 
                          'Unknown error';
      toast.error(`Failed to add category: ${errorMessage}`);
      if (error.response?.status === 401) {
        logout();
        navigate('/login'); // Navigate on 401
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/categories/${id}/`);
      toast.success('Category deleted successfully!');
      await fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category: ' + (error.response?.data?.detail || 'Unknown error'));
      if (error.response?.status === 401) {
        logout();
        navigate('/login'); // Navigate on 401
      }
    }
  };

  return (
    <div>
      <div className="category-container">
        <h2>Manage Categories</h2>
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
        {categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          <ul className="category-list">
            {categories.map((cat) => (
              <li key={cat.id}>
                {cat.name}
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Styles unchanged */}
    </div>
  );
};

export default CategoryManagement;