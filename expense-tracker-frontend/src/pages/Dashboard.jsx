import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

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

  const fetchDashboardData = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await api.get(`/api/dashboard/?${query}`);
      const data = response.data.data; // Adjust based on paginated response
      setTransactions(data.transactions);
      setTotalIncome(data.total_income);
      setTotalExpense(data.total_expense);
      setBalance(data.balance);
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="summary">
          <h3>Balance: ₹{balance}</h3>
          <p>Total Income: ₹{totalIncome}</p>
          <p>Total Expense: ₹{totalExpense}</p>
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
                  <td>₹{txn.amount}</td>
                  <td>{txn.description}</td>
                  <td>
                    <Link to={`/edit/${txn.id}`} className="action-link">
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        try {
                          await api.delete(`/api/transactions/${txn.id}/`);
                          fetchDashboardData();
                        } catch (error) {
                          console.error('Error deleting transaction:', error);
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
      </div>
      <style>{`
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
      `}</style>
    </div>
  );
};

export default Dashboard;