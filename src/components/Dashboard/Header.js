import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import { Link } from 'react-router-dom'; // Use Link from react-router-dom

const Header = () => {
  // Access the logged-in user's email from Redux state
  const { user } = useSelector((state) => state.auth);
  

  return (
    <div className="header">
      <div className="row">
        <div className="col-md-5">
          <div className="logo">
            <h1>Account Maintenance KYC Review System</h1>
          </div>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-3">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    {/* Display user's email dynamically */}
                    <button
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {user?.roles[0] || 'Branch Manager KYC'} {/* Show email if available */}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link 
                         to="#" 
                           className="dropdown-item"
                           onClick={(e) => {
                             localStorage.removeItem('token');
                             localStorage.removeItem('user');
                              e.preventDefault();
                             window.location.href = '/';
                           }}>
                          <i className="fa fa-sign-out"></i> Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
