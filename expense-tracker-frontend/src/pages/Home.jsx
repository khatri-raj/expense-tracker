import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for child elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.5)',
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div style={{
      background: `linear-gradient(180deg, rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url("/assets/expense-bg.png") center/cover no-repeat`,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
    }}>
      <motion.div
        style={{
          maxWidth: '800px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          textAlign: 'center',
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          style={{
            fontSize: '3.5rem',
            color: '#1a202c',
            marginBottom: '20px',
            fontWeight: '800',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '-0.5px',
          }}
          variants={itemVariants}
        >
          Welcome to Expense Tracker
        </motion.h1>

        <motion.p
          style={{
            fontSize: '1.5rem',
            color: '#2d3748',
            marginBottom: '30px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.7',
          }}
          variants={itemVariants}
        >
          Take control of your finances with our intuitive tools to track income, expenses, and more.
        </motion.p>

        {/* Features List */}
        <motion.div
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            marginBottom: '40px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          variants={itemVariants}
        >
          <h2 style={{
            fontSize: '2rem',
            color: '#1a202c',
            marginBottom: '20px',
            fontWeight: '700',
          }}>
            ✨ Key Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            fontSize: '1.1rem',
            color: '#2d3748',
          }}>
            {[
              { text: '💰 Track your <strong>Income</strong>', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z' },
              { text: '📉 Manage your <strong>Expenses</strong>', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' },
              { text: '📊 Monitor via <strong>Dashboard</strong>', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
              { text: '🗂️ Organize <strong>Categories</strong>', icon: 'M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z' },
              { text: '🧾 Edit/Delete <strong>Transactions</strong>', icon: 'M3 17.25V21h3.75L17.25 10.5 13.5 6.75 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
              { text: '🔐 Update <strong>Profile & Password</strong>', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
                variants={itemVariants}
              >
                <svg
                  style={{ width: '24px', height: '24px', fill: '#3b82f6' }}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={feature.icon} />
                </svg>
                <span dangerouslySetInnerHTML={{ __html: feature.text }} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
          variants={itemVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/login"
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '1.2rem',
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
              }}
            >
              Get Started
            </Link>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/register"
              style={{
                display: 'inline-block',
                padding: '12px 30px',
                background: 'linear-gradient(45deg, #28a745, #20c997)',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '1.2rem',
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)',
              }}
            >
              Sign Up
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          div[style*="minHeight: 100vh"] {
            padding: 30px 15px;
          }
          div[style*="maxWidth: 800px"] {
            padding: 20px;
          }
          h1 {
            font-size: 2.5rem;
          }
          h2 {
            font-size: 1.6rem;
          }
          p {
            font-size: 1.2rem;
            max-width: 90%;
          }
          div[style*="gridTemplateColumns"] {
            gridTemplateColumns: 1fr;
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