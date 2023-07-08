import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./component/footer";
import Nav from "./component/nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./component/login";
import MyTask from "./component/my-task";
import Home from "./component/home";
import SignUp from "./component/signUp";
import TaskDescription from "./component/add-task";
import PrivateCommponet from "./component/PrivateComponet";
import UpdateTask from "./component/updeta-task";
import AddProject from "./component/add-project";
import MyProject from "./component/my-project";
import UpdateProject from "./component/updeta-project";

// const USER_TYPS = {
//   PUBLIC: "Public User",
//   NORMAL_USER: "Normal User",
//   ADMIN_USER: "Admin User",
// };

// const CURRENT_USER_TYPE = USER_TYPS.NORMAL_USER;

function App() {
  return (
    <body>
      <div className="App">
        <div className="hedar-text-body">
          {/* <h3 className="hedar-text">XYZ</h3> */}
        </div>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route element={<PrivateCommponet />}>
              <Route
                path="/"
                element={
                  // <PublicElement>
                  <Home />
                  // </PublicElement>
                }
              />
              <Route
                path="/myTask"
                element={
                  // <UserElement>
                  <MyTask />
                  // </UserElement>
                }
              />
              <Route path="/description" element={<TaskDescription />} />
              <Route path="/updateTask/:id" element={<UpdateTask />} />
              <Route path="/updateProject/:id" element={<UpdateProject />} />
              <Route path="/addproject" element={<AddProject />} />
              <Route
                path="/myproject"
                element={
                  // <AdminElement>
                  <MyProject />
                  // </AdminElement>
                }
              />
              <Route path="/logout" element={<h1>Logout Components</h1>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </body>
  );
}

// function PublicElement({ children }) {
//   return <>{children}</>;
// }
// function UserElement({ children }) {
//   if (
//     CURRENT_USER_TYPE === USER_TYPS.NORMAL_USER ||
//     CURRENT_USER_TYPE === USER_TYPS.ADMIN_USER
//   ) {
//     return <>{children}</>;
//   } else {
//     return <Navigate to={"/"} />;
//     // return <div> You Do Not This pages</div>;
//   }
// }
// function AdminElement({ children }) {
//   if (CURRENT_USER_TYPE === USER_TYPS.ADMIN_USER) {
//     return <>{children}</>;
//   } else {
//     // return <Navigate to={"/"} />;
//     return <div> You Do Not This Admin</div>;
//   }
// }
export default App;
