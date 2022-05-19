import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import axios from "axios";
import useToken from "../../hooks/useToken";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [token] = useToken(user);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
  };
  if (loading) {
    return "wait";
  }
  if (token) {
    navigate(from, { replace: true });
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="h3 fw-bold mt-5 text-primary">Please log in</h3>
            <hr />
          </div>
        </div>
        <form onSubmit={handleLogIn} action="" className="form w-50 mx-auto">
          <input
            onBlur={handleEmailInput}
            className="form-control mb-3"
            type="email"
            name="email"
            id=""
            placeholder="email"
          />
          <input
            onBlur={handlePasswordInput}
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="password"
            id=""
          />
          <p className="text-danger small">{error?.message}</p>
          <button className="btn btn-primary text-uppercase fw-bold">
            log in
          </button>
        </form>
        <div>
          <p className="lead mt-4">
            Are You New ? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
