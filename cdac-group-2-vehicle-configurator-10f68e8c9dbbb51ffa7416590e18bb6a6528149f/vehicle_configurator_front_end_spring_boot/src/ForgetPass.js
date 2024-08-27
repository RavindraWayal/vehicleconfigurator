import React, { useState } from 'react';


export default function ForgetPass() {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    alert('Password reset link sent!');
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Forgot Password?</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input type="email" required />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
