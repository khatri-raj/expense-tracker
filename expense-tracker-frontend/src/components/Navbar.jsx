import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav style={{
        background: 'linear-gradient(90deg, #1a202c, #2d3748)',
        padding: '0.8rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        height: '50px',
        animation: 'slideIn 0.5s ease-out',
        boxSizing: 'border-box',
      }}>
        <div style={{
          fontSize: '2rem', // Increased logo font size
          fontWeight: '700',
          letterSpacing: '0.5px',
          transition: 'transform 0.3s ease, color 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.target.style.transform = 'scale(1)'}>
          <Link to="/" style={{
            color: '#ffffff',
            textDecoration: 'none',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}>Finance App</Link>
        </div>
        <div style={{
          display: 'flex',
          gap: '0.8rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          maxWidth: '70%',
        }}>
          {loggedIn ? (
            <>
              <Link to="/dashboard" style={{
                color: '#d1d5db',
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '1.1rem', // Increased link font size
              }}
              onMouseOver={e => {
                e.target.style.color = '#ffffff';
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.color = '#d1d5db';
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>Dashboard</span>
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#3b82f6',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={e => e.target.style.transform = 'scaleX(1)'}
                onMouseOut={e => e.target.style.transform = 'scaleX(0)'}/>
              </Link>
              <Link to="/add-income" style={{
                color: '#d1d5db',
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '1.1rem',
              }}
              onMouseOver={e => {
                e.target.style.color = '#ffffff';
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.color = '#d1d5db';
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>Add Income</span>
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#3b82f6',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={e => e.target.style.transform = 'scaleX(1)'}
                onMouseOut={e => e.target.style.transform = 'scaleX(0)'}/>
              </Link>
              <Link to="/add-expense" style={{
                color: '#d1d5db',
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '1.1rem',
              }}
              onMouseOver={e => {
                e.target.style.color = '#ffffff';
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.color = '#d1d5db';
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>Add Expense</span>
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#3b82f6',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={e => e.target.style.transform = 'scaleX(1)'}
                onMouseOut={e => e.target.style.transform = 'scaleX(0)'}/>
              </Link>
              <Link to="/categories" style={{
                color: '#d1d5db',
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '1.1rem',
              }}
              onMouseOver={e => {
                e.target.style.color = '#ffffff';
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.color = '#d1d5db';
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>Manage Categories</span>
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#3b82f6',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={e => e.target.style.transform = 'scaleX(1)'}
                onMouseOut={e => e.target.style.transform = 'scaleX(0)'}/>
              </Link>
              <Link to="/profile" style={{
                color: '#d1d5db',
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '1.1rem',
              }}
              onMouseOver={e => {
                e.target.style.color = '#ffffff';
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.color = '#d1d5db';
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>Profile</span>
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#3b82f6',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={e => e.target.style.transform = 'scaleX(1)'}
                onMouseOut={e => e.target.style.transform = 'scaleX(0)'}/>
              </Link>
              <Link to="/change-password" style={{
                color: '#d1d5db',
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '1.1rem',
              }}
              onMouseOver={e => {
                e.target.style.color = '#ffffff';
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.color = '#d1d5db';
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>Change Password</span>
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#3b82f6',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={e => e.target.style.transform = 'scaleX(1)'}
                onMouseOut={e => e.target.style.transform = 'scaleX(0)'}/>
              </Link>
              <button onClick={handleLogout} style={{
                background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                color: '#ffffff',
                border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                fontSize: '1.1rem', // Increased button font size
              }}
              onMouseOver={e => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.5)';
              }}
              onMouseOut={e => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)';
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>Logout</span>
                <span style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255,255,255,0.2)',
                  transition: 'left 0.3s ease',
                }}
                onMouseOver={e => e.target.style.left = '0'}
                onMouseOut={e => e.target.style.left = '-100%'}/>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                color: '#d1d5db',
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '1.1rem',
              }}
              onMouseOver={e => {
                e.target.style.color = '#ffffff';
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.color = '#d1d5db';
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>Login</span>
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#3b82f6',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={e => e.target.style.transform = 'scaleX(1)'}
                onMouseOut={e => e.target.style.transform = 'scaleX(0)'}/>
              </Link>
              <Link to="/register" style={{
                color: '#d1d5db',
                textDecoration: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                fontSize: '1.1rem',
              }}
              onMouseOver={e => {
                e.target.style.color = '#ffffff';
                e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.target.style.color = '#d1d5db';
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                }}>Register</span>
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: '#3b82f6',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={e => e.target.style.transform = 'scaleX(1)'}
                onMouseOut={e => e.target.style.transform = 'scaleX(0)'}/>
              </Link>
            </>
          )}
        </div>
      </nav>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @media (max-width: 768px) {
            nav {
              padding: 0.5rem 1rem;
              height: 45px;
            }
            nav > div:first-child {
              font-size: 1.5rem; // Adjusted for mobile
            }
            nav > div:last-child {
              gap: 0.5rem;
              max-width: 60%;
            }
            nav > div:last-child a, nav > div:last-child button {
              padding: 0.3rem 0.6rem;
              font-size: 0.9rem; // Adjusted for mobile
            }
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;