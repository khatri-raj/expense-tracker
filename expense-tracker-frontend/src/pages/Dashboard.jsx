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
      console.log('Fetching dashboard with query:', query); // Debug
      const response = await api.get(`/api/dashboard/?${query}`);
      console.log('Dashboard response:', response.data); // Debug
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
  }, [filters, page]); // Add page to dependencies

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPage(1); // Reset to page 1 on filter change
  };

  // Prepare data for chart
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
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expenses by Category',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)',
        },
      },
    },
  };

  return (
    <div>
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="summary">
          <h3>Balance: ₹{balance.toFixed(2)}</h3>
          <p>Total Income: ₹{totalIncome.toFixed(2)}</p>
          <p>Total Expense: ₹{totalExpense.toFixed(2)}</p>
        </div>

        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>

        <div className="filters">
          <h4>Filters</h4>
          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <select
            name="category_id"
            value={filters.category_id}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="actions">
          <Link to="/add-income" className="btn">
            + Add Income
          </Link>
          <Link to="/add-expense" className="btn">
            + Add Expense
          </Link>
        </div>

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6">No transactions found</td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.date}</td>
                  <td>{txn.type}</td>
                  <td>{txn.category?.name || 'N/A'}</td>
                  <td>₹{parseFloat(txn.amount).toFixed(2)}</td>
                  <td>{txn.description || '-'}</td>
                  <td>
                    <Link to={`/edit/${txn.id}`} className="action-link">
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
                      className="action-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="pagination-btn"
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
      <style>{`
        .error-message {
          color: red;
          margin-bottom: 10px;
          font-size: 14px;
          text-align: center;
        }
        .dashboard-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .summary {
          background-color: #e9ecef;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
        }
        .summary h3 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .summary p {
          font-size: 16px;
          margin: 5px 0;
        }
        .chart-container {
          margin-bottom: 20px;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .filters {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .filter-input, .filter-select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }
        .actions {
          margin-bottom: 20px;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          margin-right: 10px;
        }
        .btn:hover {
          background-color: #0056b3;
        }
        .transactions-table {
          width: 100%;
          border-collapse: collapse;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .transactions-table th, .transactions-table td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        .transactions-table th {
          background-color: #f4f4f4;
        }
        .action-link, .action-btn {
          margin-right: 10px;
          color: #007bff;
          text-decoration: none;
          cursor: pointer;
        }
        .action-btn {
          background: none;
          border: none;
        }
        .action-link:hover, .action-btn:hover {
          color: #0056b3;
        }
        .pagination {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 10px;
          align-items: center;
        }
        .pagination-btn {
          padding: 8px 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .pagination-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .pagination-btn:hover:not(:disabled) {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;