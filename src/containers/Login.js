import React from "react";
import "../assets/css/Login.css";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    hasAccount,
    setHasAccout,
    emailError,
    passwordError,
  } = props;
  return (
    <section className="login content">
      <div className="loginContainer">
        <label>UserName</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>password</label>
        <input
          type="text"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="brnContainer">
          <button onClick={handleLogin}> Sign in </button>{" "}
        </div>
      </div>
    </section>
  );
};

export default Login;
