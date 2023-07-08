import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/updeta-task.css";
import { useNavigate, useParams } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
const UpdateTask = () => {
  const [deta, setDeta] = useState("");
  const [task, setTask] = useState("");
  const [name, setName] = useState("");
  const [project_name, setProject_Name] = useState("");
  const [description, steDescription] = useState("");
  const [reporting, setReporting] = useState("");
  const [time, setTime] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTaskDeteils();
  }, []);

  const getTaskDeteils = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:3002/my-task/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setDeta(result.deta);
    setProject_Name(result.project_name);
    setTask(result.task);
    setTime(result.time);
    steDescription(result.description);
    setReporting(result.reporting);

    // console.warn(result);
  };

  const updateTask = async () => {
    console.warn(deta, time, project_name, task, name, description, reporting);
    let result = await fetch(`http://localhost:3002/my-task/${params.id}`, {
      method: "Put",
      body: JSON.stringify({
        deta,
        time,
        task,
        project_name,
        description,
        reporting,
      }),
      headers: {
        "Content-Type": "Application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/myTask");
  };
  return (
    <body>
      <view>
        {/* <h1>Welcom to task</h1> */}
        <div className="task_description_body">
          <table className="fast_row">
            <thead>
              <h3>Update-Task</h3>
            </thead>
            <tr>
              <th>
                <label>Date : </label>
              </th>
              <th>
                <label>Project Name : </label>
              </th>
              <th>
                <label>Task Lied : </label>
              </th>
            </tr>
            <tr>
              <td>
                <input
                  style={{
                    width: "90%",
                    margin: 0,
                    padding: "2%",
                    border: 1,
                    borderColor: "red",
                    borderRight: 10,
                  }}
                  type="date"
                  placeholder="date"
                  value={deta}
                  onChange={(e) => setDeta(e.target.value)}
                />
              </td>

              <td>
                <input
                  type="text"
                  placeholder="Project Name"
                  style={{
                    padding: "1.3%",
                    width: "95%",
                    margin: 0,
                    marginRight: "30%",
                  }}
                  value={project_name}
                  onChange={(e) => setProject_Name(e.target.value)}
                  disabled
                />
              </td>
              <td>
                <input
                  // class="nav-link disabled"
                  style={{
                    margin: 0,
                    padding: "1.3%",
                    width: "100%",
                  }}
                  type="text"
                  placeholder="Task Lied "
                  value={reporting}
                  onChange={(e) => setReporting(e.target.value)}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Task : </label>
              </th>
            </tr>
            <tr>
              <td colSpan={3}>
                <input
                  style={{ width: "100%", margin: 0, padding: "0.5%" }}
                  type="text"
                  placeholder="Task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Description : </label>
              </th>
            </tr>
            <tr>
              <td colSpan={3}>
                <textarea
                  rows="7"
                  cols="50"
                  placeholder="Description"
                  style={{ width: "100%" }}
                  value={description}
                  onChange={(e) => steDescription(e.target.value)}
                />
              </td>
            </tr>
          </table>
          <tr>
            <th>
              <label>Working Time : </label>
            </th>
          </tr>
          <tr>
            <td colSpan={3}>
              <input
                style={{ marginLeft: "1%" }}
                type="time"
                placeholder="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </td>
          </tr>

          <button className="button" onClick={updateTask}>
            <h3>
              <GrUpdate />
            </h3>
          </button>
        </div>
      </view>
    </body>
  );
};

export default UpdateTask;
