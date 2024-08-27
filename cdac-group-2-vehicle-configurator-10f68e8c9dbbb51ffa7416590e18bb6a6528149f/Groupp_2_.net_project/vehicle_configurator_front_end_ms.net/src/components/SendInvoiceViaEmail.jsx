import React, { useState, useContext } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ResetContext } from "../Contexts/ResetContext";

function SendInvoiceViaEmail() {
  const [recipient, setRecipient] = useState("");
  const [file, setFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { segmentSelectedTop, setSegmentSelectedTop } =
    useContext(ResetContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("ToEmail", recipient);
      formData.append("Body", "Please find the attached invoice.");

 
      if (file) {
        formData.append("Attachments", file, file.name);
      }

      const response = await fetch("https://localhost:7232/api/SendMail", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setShowSuccessMessage(true);

      setTimeout(() => {
        setSegmentSelectedTop(segmentSelectedTop + 1);
        alert("Email sent successfully!");
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Failed to send email. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Send Invoice via Email</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipient">
          <Form.Label>Recipient Email</Form.Label>
          <Form.Control
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="file">
          <Form.Label>Upload Invoice</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
      {errorMessage && (
        <Alert variant="danger" style={{ marginTop: "20px" }}>
          {errorMessage}
        </Alert>
      )}
      {showSuccessMessage && (
        <Alert variant="success" style={{ marginTop: "20px" }}>
          Email sent successfully!
        </Alert>
      )}
    </div>
  );
}

export default SendInvoiceViaEmail;
