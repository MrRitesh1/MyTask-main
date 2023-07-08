import React, { useState } from "react";
import "./style/login.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SiLogitech } from "react-icons/si";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const auth = localStorage.getItem("usar");
  //   if (auth) {
  //     navigate("/");
  //   }
  // });

  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch("http://localhost:3002/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.auth) {
      localStorage.setItem("usar", JSON.stringify(result.usar));
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate("/");
    } else {
      alert("Please Enter Crect details");
    }
  };

  return (
    <div>
      {/* <h5>Login Page</h5> */}
      <div className="login-body">
        <h3>Welcome Login</h3>
        <div className="login-conten">
          <ul>
            <th>
              <label>Usar ID : </label>
              <input
                className="text"
                type="text"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </th>
            <br />
            <th>
              <label>Password : </label>
              <input
                type="password"
                className="text"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </th>
            <br />
            <th className="login-button-body">
              <button
                className="login-button"
                type="submit"
                onClick={handleLogin}
              >
                <h3>
                  <SiLogitech />
                </h3>
              </button>
            </th>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
