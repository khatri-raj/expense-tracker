import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigate after logout
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        {loggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add-income">Add Income</Link>
            <Link to="/add-expense">Add Expense</Link>
            <Link to="/categories">Manage Categories</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/change-password">Change Password</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      {/* Styles unchanged */}
    </div>
  );
};

export default Navbar;