const Home = () => {
  return (
    <div>
      <div className="home-container">
        <h1>Welcome to Expense Tracker</h1>
        <p>Manage your income and expenses with ease.</p>
        <a href="/login" className="btn">Get Started</a>
      </div>
      <style>{`
        .home-container {
          text-align: center;
          padding: 50px;
          background-color: #f4f4f4;
          min-height: 100vh;
        }
        .home-container h1 {
          font-size: 36px;
          margin-bottom: 20px;
        }
        .home-container p {
          font-size: 18px;
          margin-bottom: 30px;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-size: 16px;
        }
        .btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Home;