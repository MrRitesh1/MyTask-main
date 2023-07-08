import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/add-task.css";
import { useNavigate } from "react-router-dom";
// import { Button } from "bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import project_data from "../api/project_data";
import AsyncSelct from "react-select/async";
import Select from "react-select";

const TaskDescription = () => {
  const [deta, setDeta] = useState("");
  const [task, setTask] = useState("");
  const [name, setName] = useState(null);
  const [project_name, setProject_Name] = useState("");
  const [description, steDescription] = useState("");
  const [reporting, setReporting] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  // const [inputValue, setValue] = useState("");
  // const [selectedValue, setSelectedValue] = useState(null);

  // const handleInputChange = (value) => {
  //   setValue(value);
  // };
  // const handleChange = (value) => {
  //   // setSelectedValue(value);
  //   setName(value);
  // };

  // const fetcData = () => {
  //   return project_data
  //     .get("http://localhost:3002/myproject")
  //     .then((result) => {
  //       const res = result.data;
  //       return res;
  //     });
  // };

  const [project, setProject] = useState([]);

  useEffect(() => {
    getProdact();
  }, []);

  const getProdact = async () => {
    let result = await fetch("http://localhost:3002/myproject", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProject(result);
  };

  project.length > 0 ? (
    project.map((data, index) => (
      <tr key={data._id}>
        <th className="task-list-data">{data.projectName}</th>

        <th> - </th>
        <th className="task-list-data">{data.name}</th>
      </tr>
    ))
  ) : (
    <h2>No Result Found</h2>
  );

  // Add task API ........
  const add_task = async () => {
    console.warn(deta, task, project_name, name, description, reporting, time);
    const userId = JSON.parse(localStorage.getItem("usar"))._id;
    // console.warn(userId);
    let result = await fetch("http://localhost:3002/description", {
      method: "post",
      body: JSON.stringify({
        deta,
        task,
        project_name,
        description,
        reporting,
        time,
        userId,
        name,
      }),
      headers: {
        "Content-Type": "application/json",
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
              <h3>Add-Task</h3>
            </thead>
            <tr>
              <th>
                <label>Date : </label>
              </th>
              <th>
                <label>Select :</label>
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
                    width: "100%",
                    margin: 0,
                    padding: "2%",
                  }}
                  type="date"
                  placeholder="date"
                  value={deta}
                  onChange={(e) => setDeta(e.target.value)}
                />
              </td>
              <td>
                {/* <Select project={project} /> */}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    style={{
                      width: "100%",

                      margin: 0,
                      backgroundColor: "#fff",
                      color: "#000",
                      padding: "8%",
                      borderRadius: 0,
                    }}
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{
                      width: 200,
                      height: 150,
                      overflow: "auto",
                      margin: 0,
                      backgroundColor: "#fff",
                      color: "#000",
                      padding: "8%",
                      borderRadius: 0,
                    }}
                  >
                    {project.length > 0 ? (
                      project.map((data, index) => (
                        <Dropdown.Item>
                          <tr key={data._id}>
                            <th className="task-list-data">
                              {data.projectName}
                            </th>

                            <th> - </th>
                            <th className="task-list-data">{data.name}</th>
                          </tr>
                        </Dropdown.Item>
                      ))
                    ) : (
                      <h2>No Result Found</h2>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <input
                  // class="nav-link disabled"
                  style={{
                    width: "100%",
                    margin: 0,
                    padding: "2%",
                  }}
                  type="text"
                  placeholder="Project Name"
                  value={project.text}
                  onChange={(e) => setProject(e.target.value)}
                  disabled
                />
              </td>

              {/* <td
                style={{
                  width: "40%",
                  margin: 0,
                  marginRight: "30%",
                }}
              >
                <AsyncSelct
                  cacheOptions
                  defaultOptions
                  // value={selectedValue}
                  value={name}
                  getOptionLabel={(e) => e.projectName}
                  getOptionValue={(e) => e.id}
                  loadOptions={fetcData}
                  onInputChange={handleInputChange}
                  onChange={handleChange}
                /> 
              </td> */}
              <td>
                <input
                  // class="nav-link disabled"
                  style={{
                    width: "100%",
                    margin: 0,
                    padding: "2%",
                  }}
                  // value={JSON.stringify(selectedValue)}
                  // onChange={(e) => setReporting(e.target.value)}
                  type="text"
                  placeholder="Task Lied "
                  value={project.text}
                  onChange={(e) => setProject(e.target.value)}
                  disabled
                />
              </td>
            </tr>

            {/* <div>Selectar : {JSON.stringify(selectedValue || {}, null, 2)}</div> */}

            <tr>
              <th>
                <label>Task : </label>
              </th>
            </tr>
            <tr>
              <td colSpan={4}>
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
              <td colSpan={4}>
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
            <td colSpan={4}>
              <input
                style={{ marginLeft: "1%" }}
                type="time"
                placeholder="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </td>
          </tr>

          <button className="button" onClick={add_task}>
            <h3>
              <MdOutlineAddTask />
            </h3>
          </button>
        </div>
      </view>
    </body>
  );
};

export default TaskDescription;
