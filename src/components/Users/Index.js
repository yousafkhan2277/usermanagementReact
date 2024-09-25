import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'; // Import useSelector to get permissions

const Users = () => {
  const { setPanelTitle } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Get permissions from Redux store
  const { permissions } = useSelector((state) => state.auth);

  // Check for specific permissions
  const canCreateUser = permissions.includes('user.create');
  const canUpdateUser = permissions.includes('user.update');
  const canDeleteUser = permissions.includes('user.delete');

  useEffect(() => {
    setPanelTitle('Users'); // Update the panel title when this component is mounted
  }, [setPanelTitle]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://192.168.0.149:5000/api/user/get-users/', {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [token]); // Add token as a dependency

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = () => {
    navigate('/dashboard/users/create');
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://192.168.0.149:5000/api/user/delete-user/${userId}`, {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        setUsers(users.filter(user => user.id !== userId)); // Remove deleted user from state
        toast.success('User deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user. Please try again.');
    }
  };

  const handleUpdateUser = (userId) => {
    navigate(`/dashboard/users/update/${userId}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ToastContainer />
      {/* Conditionally render the "Create User" button if the user has create permissions */}
      {canCreateUser && (
        <button onClick={handleCreateUser} className="btn btn-primary">
          Create User
        </button>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>User Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.user_name}</td>
              <td>
                {/* Conditionally render the "Delete" button if the user has delete permissions */}
                {canDeleteUser && (
                  <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">
                    Delete
                  </button>
                )}

                {/* Conditionally render the "Update" button if the user has update permissions */}
                {canUpdateUser && (
                  <button onClick={() => handleUpdateUser(user.id)} className="btn btn-warning">
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
