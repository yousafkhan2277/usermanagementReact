import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'; // Import useSelector for accessing permissions

const Roles = () => {
  const { setPanelTitle } = useOutletContext();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  // Get permissions from Redux store
  const { permissions } = useSelector((state) => state.auth);

  // Check if user has specific permissions
  const canCreateRole = permissions.includes('role.create');
  const canUpdateRole = permissions.includes('role.update');
  const canDeleteRole = permissions.includes('role.delete');

  useEffect(() => {
    setPanelTitle('Roles'); // Update the panel title when this component is mounted
  }, [setPanelTitle]);

  const handleCreateRole = () => {
    console.log("Sdsd");
    navigate('/dashboard/roles/create');
  };

  const fetchRoles = useCallback(async () => {
    try {
      const response = await axios.get('http://192.168.0.149:5000/api/role/get-roles/', {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        setRoles(response.data.roles);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleDeleteRole = async (roleId) => {
    try {
      const response = await axios.delete(`http://192.168.0.149:5000/api/role/delete-role/${roleId}`, {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        setRoles(roles.filter((role) => role.id !== roleId));
        toast.success('Role deleted successfully!');
      }
      else{
        toast.error(response.data.message  );
      }
    } catch (error) {
      console.error('Error deleting role:', error);
      toast.error('Error deleting role');
    }
  };

  const handleUpdateRole = (roleId) => {
    navigate(`/dashboard/roles/update/${roleId}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ToastContainer />
      <h2>Roles</h2>

      {canCreateRole && (
        <button onClick={handleCreateRole} className="btn btn-primary">Create Role</button>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.role_name}</td>
              <td>
                {canDeleteRole && (
                  <button onClick={() => handleDeleteRole(role.id)} className="btn btn-danger">Delete</button>
                )}
                {canUpdateRole && (
                  <button onClick={() => handleUpdateRole(role.id)} className="btn btn-warning">Update</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;
