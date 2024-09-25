import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRole = () => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [loading, setLoading] = useState(true);
  const { setPanelTitle } = useOutletContext();
  const navigate = useNavigate();
  const { roleId } = useParams(); // Get the role ID from the URL params
  const token = localStorage.getItem('token');

  useEffect(() => {
    setPanelTitle('Update Role');
  }, [setPanelTitle]);

  // Fetch permissions and role details on component mount
  useEffect(() => {
    const fetchRoleDetails = async () => {
      try {
        const roleResponse = await axios.get(`http://192.168.0.149:5000/api/role/role-details/${roleId}`, {
          headers: { Authorization: token },
        });
        const roleData = roleResponse.data;

        if (roleData.success) {
          setRoleName(roleData.role.role_name);
          // Map permission_ids from the role to selectedPermissions
          const assignedPermissionIds = roleData.permissions.map(p => p.permission_id);
          setSelectedPermissions(assignedPermissionIds);
        }

        const permissionResponse = await axios.get('http://192.168.0.149:5000/api/permission/get-permissions/', {
          headers: { Authorization: token },
        });

        if (permissionResponse.data.success) {
          setPermissions(permissionResponse.data.permissions);
        }
      } catch (error) {
        console.error('Error fetching role details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleDetails();
  }, [roleId, token]);

  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions((prevSelected) => {
      if (prevSelected.includes(permissionId)) {
        return prevSelected.filter((id) => id !== permissionId);
      } else {
        return [...prevSelected, permissionId];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://192.168.0.149:5000/api/role/update-role/${roleId}`, {
        role_name: roleName,
        permissions: selectedPermissions,
      }, {
        headers: { Authorization: token },
      });

      if (response.data.success) {
        toast.success('Role updated successfully!');
        navigate('/dashboard/roles', { state: { message: 'Role updated successfully!' } });
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  // Group permissions by model for easier rendering
  const groupedPermissions = permissions.reduce((acc, permission) => {
    const model = permission.model;
    if (!acc[model]) {
      acc[model] = {};
    }
    acc[model][permission.permission_name.split('.')[1]] = permission;
    return acc;
  }, {});

  return (
    console.log('selectedPermissions',selectedPermissions),
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Role Name:
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
          </label>
        </div>

        <h3>Permissions</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Permission Name</th>
              <th>Show</th>
              <th>Create</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedPermissions).map((model) => (

              <tr key={model}>
                <td>{model}</td>
                <td>
                  {groupedPermissions[model].show ? (
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(groupedPermissions[model].show.id)}
                      onChange={() => handleCheckboxChange(groupedPermissions[model].show.id)}
                    />
                  ) : null}
                </td>
                <td>
                  {groupedPermissions[model].create ? (
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(groupedPermissions[model].create.id)}
                      onChange={() => handleCheckboxChange(groupedPermissions[model].create.id)}
                    />
                  ) : null}
                </td>
                <td>
                  {groupedPermissions[model].update ? (
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(groupedPermissions[model].update.id)}
                      onChange={() => handleCheckboxChange(groupedPermissions[model].update.id)}
                    />
                  ) : null}
                </td>
                <td>
                  {groupedPermissions[model].delete ? (
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(groupedPermissions[model].delete.id)}
                      onChange={() => handleCheckboxChange(groupedPermissions[model].delete.id)}
                    />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="row">&nbsp;</div>

        <div className="row">
          <div className="form-actions">
            <div className="col-md-12">
              <button type="submit" className="btn btn-success">
                <i className="fa fa-save"></i> Update Role
              </button>
              <button type="reset" className="btn btn-default" onClick={() => navigate('/dashboard/roles')}>Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateRole;
