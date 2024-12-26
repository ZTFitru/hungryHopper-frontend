import React, { useContext, useState } from "react";
import "./LoginPopUp.css";
import { IoMdClose } from "react-icons/io";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'

const LoginPopUp = ({ setShowLogin }) => {

  const {url, token, setToken} = useContext(StoreContext)
  const [current, setCurrent] = useState("Sign up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e)=> {
    e.preventDefault()
    let newUrl = url;
    if (current === 'Login') {
      newUrl += '/api/user/login'
    } else {
      newUrl += '/api/user/register'
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      setShowLogin(false)
    } else {
      alert(response.data.message)
    }
  }


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-cont">
        <div className="login-popup-title">
          <h2>{current}</h2>
          <IoMdClose
            className="close-icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {current === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit">{current === "Sign up" ? "Create an account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {current === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrent("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already a member?{" "}
            <span onClick={() => setCurrent("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
