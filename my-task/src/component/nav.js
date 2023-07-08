import React from "react";
import "./style/nav.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
import { MdAddTask } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa";

const Nav = () => {
  const auth = localStorage.getItem("usar");
  const navigate = useNavigate();
  const logout = () => {
    console.log("Appl....");
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="nav-div">
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/updateTask"></Link>
          </li>
          <li>
            <Link to="/updateProject"></Link>
          </li>
          <li>
            <Link to="/description"></Link>
          </li>
          <li>
            <Link to="/addproject"></Link>
          </li>
          <li>
            <Link to="/">
              {" "}
              <h3>
                <BsFillHouseFill />
              </h3>
            </Link>
          </li>
          <li>
            <Link to="/myproject">
              {" "}
              <h3>
                <FaRegAddressCard />
              </h3>
            </Link>
          </li>

          <li>
            <Link to="/myTask">
              {" "}
              <h3>
                <MdAddTask />
              </h3>
            </Link>
          </li>
          <li className="nav-text6">
            <Link onClick={logout} to="/signup">
              <h3>
                <FiLogIn />
              </h3>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-text8">
            {" "}
            <Link to="/signup">Sign-Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
