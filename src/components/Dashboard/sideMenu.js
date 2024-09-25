import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Use Link from react-router-dom

const SideMenu = () => {
  const { permissions } = useSelector((state) => state.auth); // Access permissions from the store
  const [userManagementOpen, setUserManagementOpen] = useState(false);
 
  console.log("permissions",permissions);
  // Check permissions
  const canViewUsers = permissions.includes('user.show'); // Updated to match your API permissions
  const canViewRoles = permissions.includes('role.show');

  return (
    <div className="sidebar content-box" style={{ display: 'block' }}>
      <ul className="nav">

        {/* User Management Menu */}
       { (canViewUsers || canViewRoles) && <li className={`has-submenu ${userManagementOpen ? 'open' : ''}`}>
          <button
            className="nav-link btn-toggle"
            onClick={() => setUserManagementOpen(!userManagementOpen)}
          >
            <i className="fa fa-user fa-fw"></i> User Management
            <i className={`fa ${userManagementOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ float: 'right' }}></i>
          </button>
          {userManagementOpen && (
            <ul className="submenu">
              {canViewUsers && <li><Link to="/dashboard/users">Users</Link></li>}
              {canViewRoles && <li><Link to="/dashboard/roles">Roles</Link></li>}
            </ul>
          )}
        </li>
}

       

        {/* Logout Option */}
        <li>
          <button
            className="nav-link btn-logout"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/';
            }}
          >
            <i className="fa fa-sign-out"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
