import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        background: 'linear-gradient(180deg, #f4f4f4, #e9ecef)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'fadeIn 0.8s ease-out',
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#2d3748',
          marginBottom: '25px',
          fontWeight: '700',
          transition: 'all 0.3s ease',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
        onMouseOver={e => {
          e.target.style.color = '#4a5568';
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseOut={e => {
          e.target.style.color = '#2d3748';
          e.target.style.transform = 'scale(1)';
        }}>
          Welcome to Expense Tracker
        </h1>
        <p style={{
          fontSize: '1.4rem',
          color: '#4a5568',
          marginBottom: '30px',
          maxWidth: '600px',
          lineHeight: '1.6',
          transition: 'all 0.3s ease',
        }}
        onMouseOver={e => e.target.style.color = '#2d3748'}
        onMouseOut={e => e.target.style.color = '#4a5568'}>
          Manage your income and expenses with ease.
        </p>
        <Link to="/login" style={{
          display: 'inline-block',
          padding: '12px 30px',
          background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '1.2rem',
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
        }}>
          Get Started
        </Link>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          div[style*="minHeight: 100vh"] {
            padding: 30px 15px;
          }
          h1 {
            font-size: 2.2rem;
          }
          p {
            font-size: 1.1rem;
            max-width: 90%;
          }
          a[style*="padding: 12px 30px"] {
            padding: 10px 20px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;