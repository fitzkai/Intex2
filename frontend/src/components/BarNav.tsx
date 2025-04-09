import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import { AuthorizedUser } from './AuthorizeView';
import '../css/pages.css';

const BarNav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-sm"
      style={{
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left side: Brand + Links */}
        <div className="d-flex align-items-center gap-4">
          <NavLink
            className="navbar-brand fw-semibold"
            to="/"
            style={{ color: '#212529', fontSize: '1.25rem' }}
          >
            🎬 CineNiche
          </NavLink>
          <NavLink
            to="/MoviesPage"
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? '#0d6efd' : '#212529',
              fontWeight: isActive ? '500' : '400',
            })}
          >
            Movies
          </NavLink>
          <NavLink
            to="/admin"
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? '#0d6efd' : '#212529',
              fontWeight: isActive ? '500' : '400',
            })}
          >
            Admin
          </NavLink>
          <NavLink
            to="/privacy"
            className="nav-link"
            style={({ isActive }) => ({
              color: isActive ? '#0d6efd' : '#212529',
              fontWeight: isActive ? '500' : '400',
            })}
          >
            Privacy
          </NavLink>
        </div>

        {/* Right side: User info + Logout */}
        <div className="d-flex align-items-center gap-3 me-3">
          <span className="text-muted small">
            <AuthorizedUser value="email" />
          </span>
          <Logout>
            <button className="btn btn-outline-secondary btn-sm">Logout</button>
          </Logout>
        </div>
      </div>
    </nav>
  );
};

export default BarNav;
