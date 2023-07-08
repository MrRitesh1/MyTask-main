import React, { useEffect, useState } from "react";
import "./style/signUp.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SiGnuprivacyguard } from "react-icons/si";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [usarId, setUsarId] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("usar");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    if (!name || !password || !usarId || !email) {
      setErr(true);
      return false;
    }

    console.log(name, email, password);
    let result = await fetch("http://localhost:3002/singUp", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("usar", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.token));

    navigate("/");
  };

  return (
    <div>
      {/* <h1>Registar</h1> */}
      <div className="signupBody">
        <input
          className="textBoxSignUp"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        {err && !name && <span className="err-text">Enter valid name</span>}
        <input
          className="textBoxSignUp"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        {err && !email && <span className="err-text">Enter valid email</span>}
        <input
          className="textBoxSignUp"
          type="text"
          value={usarId}
          onChange={(e) => setUsarId(e.target.value)}
          placeholder="Enter UsarID"
        />
        {err && !usarId && <span className="err-text">Enter valid UsarID</span>}
        <input
          className="textBoxSignUp"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Passweord"
        />
        {err && !password && (
          <span className="err-text">Enter valid password</span>
        )}
        <button className="appButtonSignUp" type="submit" onClick={collectData}>
          <h3>
            <SiGnuprivacyguard />
          </h3>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
