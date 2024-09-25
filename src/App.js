import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DashboardLayout from './components/Dashboard/DashboardLayout'; // New Layout Component
import Users from './components/Users/Index';
import Roles from './components/Roles/ListRoles';
import Forbidden from './components/Forbidden';  // Forbidden Page Component
import DashboardHome from './components/Dashboard/DashboardHome';
import NotFound from './components/NotFound'; // Import NotFound Component
import CreateUser from './components/Users/CreateUser';
import UpdateUser from './components/Users/UpdateUser';
import CreateRole from './components/Roles/CreateRole';
import UpdateRole from './components/Roles/UpdateRole'; 





function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Helper function to check permissions
  const hasPermission = (permission) => {
    return user?.permissions.includes(permission);
  };

  return (
    <Router>
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* Protected Routes - Wrapped in the DashboardLayout */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/" />}
      >
        {/* Index Route: Default Content */}
        <Route index element={<DashboardHome />} />

        {/* Nested Routes inside DashboardLayout */}
        <Route
          path="users"
          element={hasPermission('user.show') ? <Users /> : <Navigate to="/forbidden" />}
        />
          
          <Route
            path="users/create"
            element={hasPermission('user.create') ? <CreateUser /> : <Navigate to="/forbidden" />}
          />

            <Route path="/dashboard/users/update/:userId" element={hasPermission('user.update') ? <UpdateUser /> : <Navigate to="/forbidden" />} />


        <Route
          path="roles"
          element={hasPermission('role.show') ? <Roles /> : <Navigate to="/forbidden" />}
        />
              <Route path="/dashboard/roles/create" element={hasPermission('role.create') ? <CreateRole />  : <Navigate to="/forbidden" />} />
              <Route path="/dashboard/roles/update/:roleId" element= {hasPermission('role.update') ? <UpdateRole />  : <Navigate to="/forbidden" />}/>
      </Route>



      {/* Forbidden Route */}
      <Route path="/forbidden" element={<Forbidden />} />
        {/* Catch-all Route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
}

export default App;