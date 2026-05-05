import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { User, LogOut, LayoutDashboard, ShieldAlert } from 'lucide-react';

const Navigation = () => {
  const { currentUser, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ width: '100%', padding: '1rem', background: 'var(--card-bg)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary)' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>TicketApp</Link>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {currentUser ? (
          <>
            <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Home</Link>
            {currentUser.role === 'admin' ? (
              <Link to="/admin" style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems:'center', gap:'0.5rem' }}>
                <ShieldAlert size={18} /> Admin
              </Link>
            ) : (
              <Link to="/dashboard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems:'center', gap:'0.5rem' }}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            )}
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LogOut size={16}/> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems:'center', gap:'0.5rem' }}><User size={18} /> Login</Link>
            <Link to="/register" className="btn" style={{ padding: '0.4rem 1rem', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
