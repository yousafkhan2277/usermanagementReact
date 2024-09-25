import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateUser = () => {
    const navigate = useNavigate();
    const { setPanelTitle } = useOutletContext();
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ email: '', user_name: '', password: '' });
    const token = localStorage.getItem('token');
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        setPanelTitle('Create User'); // Update the panel title when this component is mounted
    }, [setPanelTitle]);

    // Fetch roles from the API
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://192.168.0.149:5000/api/role/get-roles/', {
                    headers: { Authorization: token }
                });
                if (response.data.success) {
                    setRoles(response.data.roles); // Store the roles in state
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, [token]);

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('http://192.168.0.149:5000/api/user/create-user/', {
                ...newUser,
                role_id: selectedRole  // Include the selected role
            }, {
                headers: { Authorization: token }
            });
            if (response.data.success) {

                setUsers([...users, newUser]);

                // Show success message using react-toastify
                toast.success('User created successfully!');
            }
        } catch (error) {
            console.error('Error creating user:', error);

            // Show error message using react-toastify
            toast.error('Error creating user. Please try again.');
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="row">
                <div className="col-sm-4">
                    <div className="row">
                        <label htmlFor="userLogin" className="col-sm-4">
                            Request Initiated By : <span className="required">*</span>
                        </label>
                        <div className="col-sm-8">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="row">
                        <label htmlFor="userLogin" className="col-sm-4 d-flex">
                            Request Initiated On : <span className="required">*</span>
                        </label>
                        <div className="col-sm-8">
                            <input 
                                type="text" 
                                placeholder="User Name" 
                                value={newUser.user_name}
                                onChange={(e) => setNewUser({ ...newUser, user_name: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="row">
                        <label htmlFor="userRole" className="col-sm-4">
                            Roles <span className="required">*</span>
                        </label>
                        <div className="col-sm-8">
                            <select
                                id="userRole"
                                name="userRole"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)} // Handle selection change
                            >
                                <option value="">Select</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-4">
                    <div className="row">
                        <label htmlFor="userPassword" className="col-sm-4">
                            Password <span className="required">*</span>
                        </label>
                        <div className="col-sm-8">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">&nbsp;</div>

            <div className="row">
                <div className="form-actions">
                    <div className="col-md-12">
                        <button onClick={handleCreateUser} className="btn btn-success">
                            <i className="fa fa-save"></i> Submit
                        </button>
                        <button type="reset" className="btn btn-default" onClick={()=>navigate('/dashboard/users')}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
