import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: 'rgba(74, 85, 104, 0.2)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '20px 0',
      textAlign: 'center',
      flexShrink: 0,
      color: '#1a202c',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
      }}>
        <p style={{
          fontSize: '1rem',
          margin: 0,
          color: '#1a202c',
        }}>
          © {currentYear} Expense Tracker. All Rights Reserved.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}>
          <a
            href="rajkhatri8060@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1a202c',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = '#1a202c';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              style={{ width: '24px', height: '24px', marginRight: '8px' }}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12.713l11.985-7.714A2 2 0 0022.343 3H1.657A2 2 0 000 5v14a2 2 0 002 2h20a2 2 0 002-2V8.287l-12 7.426zm0-2.573L2 3.5h20l-10 6.64z" />
            </svg>
            Email
          </a>
          <a
            href="https://github.com/khatri-raj"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1a202c',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = '#1a202c';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              style={{ width: '24px', height: '24px', marginRight: '8px' }}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rajkhatri2002/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1a202c',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = '#1a202c';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              style={{ width: '24px', height: '24px', marginRight: '8px' }}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://codewithraj-portfolio.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1a202c',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.color = '#3b82f6';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = '#1a202c';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              style={{ width: '24px', height: '24px', marginRight: '8px' }}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 3h-4.5a2 2 0 00-2 2v14a2 2 0 002 2h4.5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 15h-3.5V7h3.5v11zm-5 0h-3.5V7h3.5v11zm-5 0H5V7h3.5v11zm-3-16H5v1h3.5V2H5V3zM19 3v1h-3.5V3h3.5z" />
            </svg>
            Portfolio
          </a>
        </div>
      </div>
      <style>{`
        footer {
          margin-top: auto;
        }
        @media (max-width: 768px) {
          footer div {
            gap: 10px;
          }
          footer p {
            font-size: 0.9rem;
          }
          footer a {
            font-size: 0.9rem;
          }
          footer svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;