import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import useToken from "../../hooks/useToken";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [token] = useToken(user);
  const navigate = useNavigate();
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorMsg("password length must be greater than 6");
      return;
    }

    await createUserWithEmailAndPassword(email, password);
  };
  if (token) {
    navigate("/");
  }
  if (loading) {
    return "wait";
  }
  return (
    <div>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="h3 fw-bold mt-5 text-primary">Please sign up</h3>
              <hr />
            </div>
          </div>
          <form
            onSubmit={handleCreateUser}
            action=""
            className="form w-50 mx-auto"
          >
            <input
              className="form-control mb-3"
              type="email"
              name="emailid"
              id=""
              placeholder="email"
              onBlur={handleEmailInput}
            />
            <input
              className="form-control mb-3"
              type="password"
              name="password"
              placeholder="password"
              id="passwords"
              onBlur={handlePasswordInput}
            />
            <p className="text-danger small">{error?.message}</p>
            <button className="btn btn-primary text-uppercase fw-bold">
              sign up
            </button>
          </form>
          <div>
            <p className="lead mt-4">
              Already Have an acoount ? <Link to="/login">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
