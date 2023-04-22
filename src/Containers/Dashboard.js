// src/components/Dashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const userId = localStorage.getItem("userId");
  const [emailStatusData, setEmailStatusData] = useState([]); // State to store email status data

  // Fetch email status data from API when component mounts
  useEffect(() => {
    const fetchEmailStatusData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_URL + "/emailstatus"
        );
        setEmailStatusData(response.data); // Set email status data in state
      } catch (error) {
        console.error("Error fetching email status data:", error);
      }
    };
    fetchEmailStatusData();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

  const handleSendEmail = async () => {
    try {
      // Make API call to send email
      const response = await axios.post(
        process.env.REACT_APP_URL + "/emailstatus",
        {
          userId: userId,
          email: email,
          emailBody: emailBody,
          status: "false",
        }
      );

      // Handle success response
      console.log("Email sent successfully!", response.data);
    } catch (error) {
      // Handle error response
      console.error("Error sending email:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "row", // Change to "row" for horizontal alignment
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
          margin: "auto",
        }}
      >
        <label
          htmlFor="email"
          style={{ marginBottom: "8px", marginRight: "8px" }}
        >
          {" "}
          {/* Add margin-right for spacing */}
          To:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          style={{ marginBottom: "16px", padding: "8px" }}
        />
        <label
          htmlFor="emailBody"
          style={{ marginBottom: "8px", marginRight: "8px" }}
        >
          {" "}
          {/* Add margin-right for spacing */}
          Email Body:
        </label>
        <textarea
          id="emailBody"
          name="emailBody"
          value={emailBody}
          onChange={handleEmailBodyChange}
          style={{ marginBottom: "16px", padding: "8px", minHeight: "150px" }}
        />
        <button
          type="button"
          onClick={handleSendEmail}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>

      {/* Table to display email status data */}
      <table
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginTop: "32px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
              Email
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
              Body
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {emailStatusData.map((data) => (
            <tr key={data.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                {data.email}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                {data.body}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
                {data.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
