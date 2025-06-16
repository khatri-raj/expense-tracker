import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Correct import path

const Navbar = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
      <style>{`
        .navbar {
          background-color: #333;
          padding: 15px;
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .navbar a, .navbar button {
          color: white;
          text-decoration: none;
          font-size: 16px;
          padding: 8px 12px;
          border-radius: 4px;
          transition: background-color 0.3s;
        }
        .navbar a:hover, .navbar button:hover {
          background-color: #555;
        }
        .navbar button {
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Navbar;