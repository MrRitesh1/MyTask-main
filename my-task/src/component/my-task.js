import React, { useEffect, useState } from "react";
import "./style/my-task-project.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  BsFillPenFill,
  BsFillPersonPlusFill,
  BsFillTrash3Fill,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MyTask = () => {
  const [task, setTask] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [shows, setShows] = useState(false);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    let result = await fetch("http://localhost:3002/my-task", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setTask(result);
  };
  console.log("products", task);

  const deletTask = async (id) => {
    let result = await fetch(`http://localhost:3002/my-task/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getTask();
      alert("Record is Delete");
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3002/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setTask(result);
      }
    } else {
      getTask();
    }
  };

  return (
    <div>
      <div className="add-task-body">
        <div className="add-task-btn-bar">
          <td>
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
              onChange={searchHandle}
              style={{
                padding: "3%",
                fontSize: 16,
                borderRadius: "10px",
                border: "1px solid #000",
              }}
            />
          </td>
          <td>
            <button className="add-task-btn">
              <Link to="/description">
                <h4>
                  <BsFillPersonPlusFill />
                </h4>
              </Link>
            </button>
          </td>
        </div>

        {/* <h5>My-Task Page</h5> */}
        <div className="task-body">
          <div className="task-hedar">
            <ul className="task-list">
              <li className="task-list-titl">Task No</li>
              <li className="task-list-titl">Date</li>
              <li className="task-list-titl">Project Name</li>
              <li className="task-list-titl">Task Name</li>
              <li className="task-list-titl">Description</li>
              <li className="task-list-titl">Time</li>
              <li className="task-list-titl">Task Lied</li>
              <li className="task-list-titl">Action </li>
            </ul>
          </div>

          <div className="api-data">
            {task.length > 0 ? (
              task.map((data, index) => (
                <div className="task-data">
                  <ul className="task-list-bodi" key={data._id}>
                    <li className="task-list-data">{index + 1}</li>
                    <li className="task-list-data">{data.deta}</li>
                    <li className="task-list-data">{data.project_name}</li>
                    <li className="task-list-data">{data.task}</li>
                    <li className="task-list-data">{data.description}</li>
                    <li className="task-list-data">{data.time}</li>
                    <li className="task-list-data">{data.reporting}</li>
                    <li className="product-list-body">
                      <a>
                        <Link to={"/updateTask/" + data._id} className="button">
                          <BsFillPenFill />
                        </Link>
                      </a>

                      <a className="button" onClick={() => deletTask(data._id)}>
                        <BsFillTrash3Fill />
                      </a>

                      {/* <a className="button" onClick={() => deletTask(data._id)}>
                        <BsFillTrash3Fill />
                      </a> */}
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <h2>No Result Found</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTask;
