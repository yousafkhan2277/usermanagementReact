import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import '../assets/css/styles.css';
import logo from '../assets/images/logo_mcb.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Fetch the JSON file with the user data
    const response = await fetch('/users.json');
    const users = await response.json();

    // Check if the user exists and the password matches
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Mock token (in a real scenario, you will receive this from the backend)
      const token = 'your_jwt_token';

      // Dispatch login success action with user data and token
      dispatch(loginSuccess({ token, user }));

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      alert('Invalid credentials');
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
         <span className ="project-heading" > MCB cash House System</span>
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
