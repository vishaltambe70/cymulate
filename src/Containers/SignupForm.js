import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ isAuthenticated, onAuthChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(process.env.REACT_APP_URL + "/signin", {
        email,
        password,
      });

      // If sign-in is successful, store the token in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      onAuthChange(true);
      navigate("/dashboard");
    } catch (error) {
      // If sign-in fails, display error message
      setError("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "10px 0" }}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "10px 0" }}
        required
      />
      <br></br>
      {error && <p>{error}</p>}

      <br></br>
      <button type="submit" style={{ width: "100%" }}>
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
