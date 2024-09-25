import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRole = () => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [loading, setLoading] = useState(true);
  const { setPanelTitle } = useOutletContext();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setPanelTitle('Create Role'); // Update the panel title when this component is mounted
  }, [setPanelTitle]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get('http://192.168.0.149:5000/api/permission/get-permissions/', {
          headers: { Authorization: token },
        });
        console.log("response.data",response.data);
        if (response.data.success) {
          setPermissions(response.data.permissions);
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [token]);

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
      const response = await axios.post('http://192.168.0.149:5000/api/role/create-role/', {
        role_name: roleName,
        permissions: selectedPermissions, 
      }, {
        headers: { Authorization: token },
      });
      if (response.data.success) {

        toast.success('Role created successfully!');
      //  navigate('/dashboard/roles', { state: { message: 'Role created successfully!' } });
      }
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  // Group permissions by model
  const groupedPermissions = permissions.reduce((acc, permission) => {
    const model = permission.model; 
    if (!acc[model]) {
      acc[model] = {};
    }
    acc[model][permission.permission_name.split('.')[1]] = permission;
    return acc;
  }, {});

  return (
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
                <i className="fa fa-save"></i> Submit
            </button>
            <button type="reset" className="btn btn-default" onClick={()=>navigate('/dashboard/roles')}>Cancel</button>
        </div>
    </div>
</div>
      </form>
    </div>
  );
};

export default CreateRole;
