import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Alert } from 'react-st-modal';
import ForgotPasswordForm from './ForgotPasswordForm';

function SignInForm() {
  const [state, setState] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { setIsLogged } = useContext(AuthContext);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // First fetch: User login
      const loginResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const loginSuccess = await loginResponse.json();
      console.log("Login success==>:", loginSuccess);

      if (loginSuccess) {
        setIsLogged(true);
        Alert(`Welcome ${state.username}`);
      } else {
        Alert('INVALID ENTRY');
        return;  // Stop further execution if login failed
      }

      // Clear the form state
      setState({});

      // Second fetch: Fetch user data based on username
      const userDataResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/${state.username}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await userDataResponse.json();
      localStorage.setItem("userId", data);
      console.log("User data==>", data);
      
    } catch (error) {
      console.error("An error occurred:", error);
      Alert("An error occurred while trying to sign in. Please try again.");
    }
  };

  return (
    <div className="form-container sign-in-container">
      {showForgotPassword ? (
        <ForgotPasswordForm onClose={() => setShowForgotPassword(false)} />
      ) : (
        <form onSubmit={handleOnSubmit}>
          <h1>Sign in</h1>
          <br />
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={state.username || ""}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={state.password || ""}
            onChange={handleChange}
          />
          <a onClick={() => setShowForgotPassword(true)}>Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      )}
    </div>
  );
}

export default SignInForm;
