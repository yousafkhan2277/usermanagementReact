import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import '../assets/css/styles.css';
import '../assets/css/forms.css';
import logo from '../assets/images/logo_mcb.png';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to your login endpoint
      const response = await fetch('http://192.168.0.149:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the body
      });

      const data = await response.json();
    
      if (data.success) {
        // Dispatch login success action with user data, roles, and permissions
        const token = data.access_token;
        const user = {
          email: data.user.email,
          name: data.user.user_name,
          roles: data.roles,
          permissions: data.permissions,
        };

        // Dispatch action to store token, user, and permissions in Redux
        dispatch(loginSuccess({ token, user, permissions: data.permissions }));
        console.log("data.permissions",data.permissions);

        // Store in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('permissions', JSON.stringify(data.permissions));

        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed, please try again.');
    }
  };

  return (
    <div className="login-screen-bg">
      <div className="login-fade-in"></div>
      <div className="page-content container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="login-wrapper">
              <div className="logo-heading">
                <span className="project-heading"> MCB Cash House System</span>
              </div>
              <div className="box">
                <div id="head" style={{ textAlign: 'center' }}>
                  <img src={logo} alt="Logo" height="100px" width="100px" />
                </div>
                <div className="content-wrap">
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="fa fa-user"></i>
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="fa fa-lock"></i>
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="action">
                      <button className="btn btn-success" type="submit">Login</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="already" style={{ textAlign: 'center', color: 'white' }}>
                <p>Copyright ©</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
