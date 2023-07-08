import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/updeta-task.css";
import { useNavigate, useParams } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";

const UpdateProject = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [database, setDatabase] = useState("");
  const [description, setDescription] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProjectDeteils();
  }, []);

  const getProjectDeteils = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:3002/myproject/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setId(result.id);
    setName(result.name);
    setProjectName(result.projectName);
    setFrontend(result.frontend);
    setBackend(result.backend);
    setDatabase(result.database);
    setDescription(result.description);
  };

  const updateProject = async () => {
    console.warn(
      id,
      name,
      projectName,
      frontend,
      backend,
      database,
      description
    );
    let result = await fetch(`http://localhost:3002/myproject/${params.id}`, {
      method: "Put",
      body: JSON.stringify({
        id,
        name,
        projectName,
        frontend,
        backend,
        database,
        description,
      }),
      headers: {
        "Content-Type": "Application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.warn(result);
    navigate("/myproject");
  };
  return (
    <body>
      <view>
        {/* <h1>Welcom to task</h1> */}
        <div className="task_description_body">
          <table className="fast_row">
            <thead>
              <h3>Update-Project</h3>
            </thead>
            <tr>
              <th>
                <label>ID : </label>
              </th>
              <th>
                <label>Name : </label>
              </th>
              <th>
                <label>ProjectName : </label>
              </th>
            </tr>
            <tr>
              <td>
                <input
                  style={{
                    width: "95%",
                    margin: 0,
                    padding: "1.3%",
                  }}
                  type="id"
                  placeholder="ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </td>

              <td>
                <input
                  style={{
                    padding: "1.3%",
                    width: "95%",
                    margin: 0,
                    marginRight: "30%",
                  }}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  placeholder="ProjectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label>Frontend : </label>
              </th>
              <th>
                <label>Backend : </label>
              </th>
              <th>
                <label>Database : </label>
              </th>
            </tr>
            <tr>
              <td>
                <input
                  style={{
                    width: "95%",
                    margin: 0,
                    padding: "1.3%",
                  }}
                  type="text"
                  placeholder="Frontend"
                  value={frontend}
                  onChange={(e) => setFrontend(e.target.value)}
                />
              </td>

              <td>
                <input
                  style={{
                    padding: "1.3%",
                    width: "95%",
                    margin: 0,
                    marginRight: "30%",
                  }}
                  type="text"
                  placeholder="Backend"
                  value={backend}
                  onChange={(e) => setBackend(e.target.value)}
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
                  placeholder="Database"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
            </tr>
          </table>
          <button className="button" onClick={updateProject}>
            <h3>
              <GrUpdate />
            </h3>
          </button>
        </div>
      </view>
    </body>
  );
};

export default UpdateProject;
