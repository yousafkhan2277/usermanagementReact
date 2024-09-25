import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({ email: '', user_name: '', role_id: '' });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data and roles when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://192.168.0.149:5000/api/user/get-user/${userId}`, {
          headers: { Authorization: token },
        });
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://192.168.0.149:5000/api/role/get-roles/', {
          headers: { Authorization: token },
        });
        if (response.data.success) {
          setRoles(response.data.roles);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchUser();
    fetchRoles();
    setLoading(false);
  }, [userId, token]);

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`http://192.168.0.149:5000/api/user/update/${userId}`, user, {
        headers: { Authorization: token },
      });
      if (response.data.success) {
        toast.success('User updated successfully!');
        navigate('/dashboard/users');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ToastContainer />
      <h2>Update User</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div>
        <label>User Name:</label>
        <input
          type="text"
          value={user.user_name}
          onChange={(e) => setUser({ ...user, user_name: e.target.value })}
        />
      </div>
      <div>
        <label>Role:</label>
        <select
          value={user.role_id}
          onChange={(e) => setUser({ ...user, role_id: e.target.value })}
        >
          <option value="">Select</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.role_name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UpdateUser;
