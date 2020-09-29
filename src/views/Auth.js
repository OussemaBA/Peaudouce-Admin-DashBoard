import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import Login from "../containers/Login";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [hasAccount, setHasAccout] = useState(false);
  let [passwordError, setPasswordError] = useState(undefined);
  let [emailError, setEmailError] = useState(undefined);
  const history = useHistory();

  const handleLogin = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        cookies.set("userCookies", true, { path: "" });
        history.push("/dashboard");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            emailError = err.message;
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            passwordError = err.message;
            break;
        }
      });
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else setUser("");
    });
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    authListener();
  }, []);
  return (
    <div className="content">
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        hasAccount={hasAccount}
        setHasAccout={setHasAccout}
        emailError={emailError}
        passwordError={passwordError}
      />
    </div>
  );
};
export default SignIn;
