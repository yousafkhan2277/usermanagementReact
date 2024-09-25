// NotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
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
        404 - Not Found
      </p>
    </div>
    <div className="col-md-10">
      <h3>OPPSSS!!!! Sorry...</h3>
      <p>The page you are looking for does not exist.</p>
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

export default NotFound;
