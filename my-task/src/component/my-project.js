import React, { useEffect, useState } from "react";
import "./style/my-task-project.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  BsFillPenFill,
  BsFillPersonPlusFill,
  BsFillTrash3Fill,
} from "react-icons/bs";

const MyProject = () => {
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
  console.log("products", project);

  const deletProject = async (id) => {
    let result = await fetch(`http://localhost:3002/myproject/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProdact();
      alert("Record is Delete");
    }
  };

  // const searchHandle = async (event) => {
  //   let key = event.target.value;
  //   if (key) {
  //     let result = await fetch(`http://localhost:3002/search/${key}`,{
  //   headers: {
  //     authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //   },
  // });
  //     result = await result.json();
  //     if (result) {
  //       setProject(result);
  //     }
  //   } else {
  //     getProdact();
  //   }
  // };

  return (
    <div>
      <div className="add-task-body">
        <div className="add-task-btn-bar">
          <tr>
            <td>
              <input
                type="text"
                placeholder="Search"
                className="search-bar"
                // onChange={searchHandle}
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
                <Link to="/addproject">
                  <h4>
                    <BsFillPersonPlusFill />
                  </h4>
                </Link>
              </button>
            </td>
          </tr>
        </div>

        {/* <h5>My-Task Page</h5> */}
        <div className="task-body">
          <div className="task-hedar">
            <ul className="task-list">
              <li className="task-list-titl">Task No</li>
              <li className="task-list-titl">Name</li>
              <li className="task-list-titl">Project Name</li>
              <li className="task-list-titl">Frontend</li>
              <li className="task-list-titl">Backend</li>
              <li className="task-list-titl">DataBase</li>
              <li className="task-list-titl">description</li>
              <li className="task-list-titl">Action </li>
            </ul>
          </div>
          <div className="api-data">
            {project.length > 0 ? (
              project.map((data, index) => (
                <div className="task-data">
                  <ul className="task-list-bodi" key={data._id}>
                    <li className="task-list-data">{index + 1}</li>
                    <li className="task-list-data">{data.name}</li>
                    <li className="task-list-data">{data.projectName}</li>
                    <li className="task-list-data">{data.frontend}</li>
                    <li className="task-list-data">{data.backend}</li>
                    <li className="task-list-data">{data.database}</li>
                    <li className="task-list-data">{data.description}</li>
                    <li className="product-list-body">
                      <a>
                        <Link
                          className="button"
                          to={"/updateProject/" + data._id}
                        >
                          <BsFillPenFill />
                        </Link>
                      </a>
                      <a
                        className="button"
                        onClick={() => deletProject(data._id)}
                      >
                        <BsFillTrash3Fill />
                      </a>
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

export default MyProject;
