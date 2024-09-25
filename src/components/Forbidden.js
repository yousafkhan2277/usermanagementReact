import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Forbidden = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Redirect to a safe route, like home or dashboard
    navigate('/'); // Change this to the desired route
  };

  return (
    <div className="bg-white text-black py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-2 text-center">
            <p>
              <i className="fa fa-exclamation-triangle fa-5x"></i>
              <br />
              Status Code: 403
            </p>
          </div>
          <div className="col-md-10">
            <h3>OPPSSS!!!! Sorry...</h3>
            <p>
              Sorry, your access is refused due to security reasons of our server and also our sensitive data.
              <br />
              Please go back to a safe page to continue browsing.
            </p>
            <button
              className="btn btn-danger"
              onClick={handleGoBack} // Call the handleGoBack function
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
