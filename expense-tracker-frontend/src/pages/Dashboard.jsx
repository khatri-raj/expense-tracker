import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    category_id: '',
    type: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    setError(null);
    try {
      const query = new URLSearchParams({ ...filters, page }).toString();
      const response = await api.get(`/api/dashboard/?${query}`);
      const data = response.data.data;
      if (!data || !Array.isArray(data.transactions)) {
        throw new Error('Invalid response format');
      }
      setTransactions(data.transactions);
      setTotalIncome(data.total_income || 0);
      setTotalExpense(data.total_expense || 0);
      setBalance(data.balance || 0);
      setCategories(data.categories || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.response || error);
      let errorMessage = 'Failed to load dashboard data';
      if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filters, page]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPage(1);
  };

  const chartData = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        label: 'Income',
        data: categories.map((cat) =>
          transactions
            .filter((txn) => txn.type === 'Income' && txn.category?.id === cat.id)
            .reduce((sum, txn) => sum + parseFloat(txn.amount || 0), 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expense',
        data: categories.map((cat) =>
          transactions
            .filter((txn) => txn.type === 'Expense' && txn.category?.id === cat.id)
            .reduce((sum, txn) => sum + parseFloat(txn.amount || 0), 0)
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14 } } },
      title: { display: true, text: 'Income vs Expenses by Category', font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Amount (₹)', font: { size: 14 } } },
      x: { title: { display: true, text: 'Categories', font: { size: 14 } } },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      marginTop: '60px', // Adjusted for shorter navbar
      animation: 'fadeIn 0.8s ease-out',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#2d3748',
        textAlign: 'center',
        marginBottom: '25px',
        transition: 'all 0.3s ease',
        background: 'linear-gradient(180deg, #edf2f7, #ffffff)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
      onMouseOver={e => {
        e.target.style.color = '#4a5568';
        e.target.style.transform = 'scale(1.02)';
      }}
      onMouseOut={e => {
        e.target.style.color = '#2d3748';
        e.target.style.transform = 'scale(1)';
      }}>
        Dashboard
      </h1>
      {error && (
        <div style={{
          color: '#721c24',
          marginBottom: '15px',
          fontSize: '1.1rem',
          textAlign: 'center',
          backgroundColor: '#f8d7da',
          padding: '12px',
          borderRadius: '6px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          animation: 'slideIn 0.5s ease-out',
        }}>
          {error}
        </div>
      )}
      <div style={{
        background: 'linear-gradient(180deg, #e9ecef, #f8fafc)',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '25px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
      onMouseOver={e => e.target.style.transform = 'scale(1.02)'}
      onMouseOut={e => e.target.style.transform = 'scale(1)'}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: '#2d3748' }}>
          Balance: ₹{balance.toFixed(2)}
        </h3>
        <p style={{ fontSize: '1.2rem', margin: '8px 0', color: '#4a5568' }}>
          Total Income: ₹{totalIncome.toFixed(2)}
        </p>
        <p style={{ fontSize: '1.2rem', margin: '8px 0', color: '#4a5568' }}>
          Total Expense: ₹{totalExpense.toFixed(2)}
        </p>
      </div>

      <div style={{
        marginBottom: '25px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        animation: 'slideIn 0.7s ease-out',
      }}
      onMouseOver={e => e.target.style.transform = 'scale(1.01)'}
      onMouseOut={e => e.target.style.transform = 'scale(1)'}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '25px',
        flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        animation: 'slideIn 0.6s ease-out',
      }}>
        <h4 style={{ fontSize: '1.4rem', color: '#2d3748', margin: '0 10px 0 0' }}>Filters</h4>
        <input
          type="date"
          name="start_date"
          value={filters.start_date}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backgroundColor: '#ffffff',
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
        <input
          type="date"
          name="end_date"
          value={filters.end_date}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backgroundColor: '#ffffff',
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
        <select
          name="category_id"
          value={filters.category_id}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backgroundColor: '#ffffff',
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
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          style={{
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backgroundColor: '#ffffff',
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
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div style={{ marginBottom: '25px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Link to="/add-income" style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'linear-gradient(45deg, #28a745, #20c997)',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '6px',
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
        }}>
          + Add Income
        </Link>
        <Link to="/add-expense" style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'linear-gradient(45deg, #dc3545, #ef4444)',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(220, 53, 69, 0.3)',
        }}
        onMouseOver={e => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.5)';
        }}
        onMouseOut={e => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 2px 8px rgba(220, 53, 69, 0.3)';
        }}>
          + Add Expense
        </Link>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '25px',
        animation: 'slideIn 0.7s ease-out',
      }}>
        <thead>
          <tr style={{ background: 'linear-gradient(180deg, #f4f4f4, #e9ecef)' }}>
            <th style={{ padding: '14px', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '1.1rem', color: '#2d3748' }}>Date</th>
            <th style={{ padding: '14px', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '1.1rem', color: '#2d3748' }}>Type</th>
            <th style={{ padding: '14px', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '1.1rem', color: '#2d3748' }}>Category</th>
            <th style={{ padding: '14px', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '1.1rem', color: '#2d3748' }}>Amount</th>
            <th style={{ padding: '14px', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '1.1rem', color: '#2d3748' }}>Description</th>
            <th style={{ padding: '14px', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '1.1rem', color: '#2d3748' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{
                padding: '14px',
                border: '1px solid #d1d5db',
                textAlign: 'center',
                fontSize: '1.1rem',
                color: '#4a5568',
              }}>
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((txn) => (
              <tr key={txn.id} style={{
                transition: 'all 0.3s ease',
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#f8f9fa'}
              onMouseOut={e => e.target.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '14px', border: '1px solid #d1d5db', fontSize: '1rem' }}>{txn.date}</td>
                <td style={{ padding: '14px', border: '1px solid #d1d5db', fontSize: '1rem' }}>{txn.type}</td>
                <td style={{ padding: '14px', border: '1px solid #d1d5db', fontSize: '1rem' }}>{txn.category?.name || 'N/A'}</td>
                <td style={{ padding: '14px', border: '1px solid #d1d5db', fontSize: '1rem' }}>₹{parseFloat(txn.amount).toFixed(2)}</td>
                <td style={{ padding: '14px', border: '1px solid #d1d5db', fontSize: '1rem' }}>{txn.description || '-'}</td>
                <td style={{ padding: '14px', border: '1px solid #d1d5db', fontSize: '1rem' }}>
                  <Link to={`/edit/${txn.id}`} style={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    marginRight: '12px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={e => e.target.style.color = '#2563eb'}
                  onMouseOut={e => e.target.style.color = '#3b82f6'}>
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      try {
                        await api.delete(`/api/transactions/${txn.id}/`);
                        toast.success('Transaction deleted successfully!');
                        fetchDashboardData();
                      } catch (error) {
                        console.error('Error deleting transaction:', error);
                        toast.error('Failed to delete transaction');
                      }
                    }}
                    style={{
                      color: '#ef4444',
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={e => e.target.style.color = '#dc2626'}
                    onMouseOut={e => e.target.style.color = '#ef4444'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        alignItems: 'center',
        animation: 'slideIn 0.6s ease-out',
      }}>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          style={{
            padding: '10px 16px',
            background: page === 1 ? '#d1d5db' : 'linear-gradient(45deg, #3b82f6, #2563eb)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: page === 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
            fontSize: '1rem',
          }}
          onMouseOver={e => {
            if (page !== 1) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.5)';
            }
          }}
          onMouseOut={e => {
            if (page !== 1) {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
            }
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: '1.1rem', color: '#2d3748' }}>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          style={{
            padding: '10px 16px',
            background: page === totalPages ? '#d1d5db' : 'linear-gradient(45deg, #3b82f6, #2563eb)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: page === totalPages ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
            fontSize: '1rem',
          }}
          onMouseOver={e => {
            if (page !== totalPages) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.5)';
            }
          }}
          onMouseOut={e => {
            if (page !== totalPages) {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
            }
          }}
        >
          Next
        </button>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @media (max-width: 768px) {
            div[style*="maxWidth: 1200px"] {
              padding: 10px;
            }
            h1 {
              font-size: 2rem;
              padding: 10px;
            }
            h3 {
              font-size: 1.5rem;
            }
            div[style*="flexWrap: wrap"] {
              gap: 8px;
            }
            input, select {
              padding: 8px;
              font-size: 0.9rem;
            }
            table {
              font-size: 0.9rem;
            }
            th, td {
              padding: 10px;
            }
            button, a[style*="padding: 12px 24px"] {
              padding: 8px 16px;
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;