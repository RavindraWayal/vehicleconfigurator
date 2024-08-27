import React, { useState } from "react";

function ForgotPasswordForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("english");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(language);

    // Construct the URL with the email as a query parameter
    const url = `${process.env.REACT_APP_BASE_URL}/api/forgot-password?email=${encodeURIComponent(email)}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language, // Add the language in the Accept-Language header
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Password reset link sent successfully.");
          alert("Password reset link sent successfully.");
        } else {
          console.error("Failed to send password reset link.");
          alert("Failed to send password reset link.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });

    // Close the forgot password form after submission
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      <br />
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <select name="language" value={language} onChange={handleLanguageChange} required>
        <option value=" ">select lang</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
      </select>
      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default ForgotPasswordForm;