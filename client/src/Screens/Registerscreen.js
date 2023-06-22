import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userAction";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";
import Swal from "sweetalert2";

export default function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const registerState = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerState;

  const dispatch = useDispatch();
  function register() {
    if (
      password.length === 0 ||
      cpassword.length === 0 ||
      name.length === 0 ||
      email.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "you must fill all the fields",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    } else {
      if (password != cpassword) {
        Swal.fire({
          icon: "error",
          title: "password and confirm password do not match",
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
      } else {
        const user = {
          name,
          email,
          password,
        };
        dispatch(registerUser(user));
      }
    }
  }

  return (
    <div className="registeration">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-leftcol-md-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded ">
          {loading && <Loading />}
          {success && <Success success="User Registered successfully" />}
          {error && <Error error="Email already Registered ! " />}

          <h2 className="text-center" åstyle={{ fontSize: "35px" }}>
            {" "}
            Registration
          </h2>
          <div>
            <input
              required
              type="text "
              placeholder="name"
              className="form-control"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            ></input>
            <input
              required
              type="text "
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            ></input>
            <input
              required
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            ></input>
            <input
              required
              type="password"
              placeholder="confirm Password"
              className="form-control"
              value={cpassword}
              onChange={(e) => {
                setcpassword(e.target.value);
              }}
            ></input>
            <button className="btn mt-3 mb-3" onClick={register}>
              Register
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
