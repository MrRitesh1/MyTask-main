const express = require("express");
require("../db/config");
const jwt = require("jsonwebtoken");
const jwtKey = "My-Task";

const Usar = require("../db/usars");
const Task = require("../db/taskData");
const ProjectCollection = require("../db/projectCollection");
const RolesModel = require("../db/rolesModel.js");

var cors = require("cors");
const { Types } = require("mongoose");
const app = express();

app.use(express.json());

app.use(cors());

app.post("/add-role", async (req, resp) => {
  const role = req.body.role;
  const permissions = req.body.permissions;

  const newRole = await new RolesModel({ role, permissions });
  const isSaved = await newRole.save();
  if (isSaved) {
    resp.send({ code: 200, massage: "role add" });
  } else {
    return resp.send({ code: 500, massage: "sarver err" });
  }
});

app.post("/delete-role", async (req, resp) => {
  resp.send({ code: 200, massage: "role delete" });
});

app.post("/singUp", async (req, resp) => {
  // const name = req.body.name;
  // const email = req.body.email;
  // const password = req.body.email;
  const type = req.body.type || "USER";
  const roles = [type];
  // var token = jwt.sign({ email: req.body.email }, "key");
  let usar = new Usar(req.body, roles);
  // let usar = new Usar(name, email, password, type, roles);

  // usar.token = token;
  let result = await usar.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "5h" }, (err, token) => {
    if (err) {
      resp.send({ result: "something went wrong" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let usar = await Usar.findOne(req.body).select("-password");
    if (usar) {
      jwt.sign({ usar }, jwtKey, { expiresIn: "5h" }, (err, token) => {
        if (err) {
          resp.send({ result: "something went wrong" });
        }
        resp.send({ usar, auth: token });
      });
    } else {
      resp.send({ result: "No Usar Found" });
    }
  } else {
    resp.send({ result: "No Usar Found" });
  }

  // resp.send(usar);
  // resp.send(req.body);
});

app.post("/description", verifyToken, async (req, tesp) => {
  let task = new Task(req.body);
  let result = await task.save();
  tesp.send(result);
});

app.get("/my-task", async (req, resp) => {
  let task = await Task.find();
  if (task.length > 0) {
    resp.send(task);
  } else {
    resp.send({ result: "No Task Found" });
  }
});
app.delete("/my-task/:id", verifyToken, async (req, resp) => {
  const result = await Task.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/my-task/:id", verifyToken, async (req, resp) => {
  let result = await Task.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    result.send({ result: "No Task Found" });
  }
});

app.put("/my-task/:id", verifyToken, async (req, resp) => {
  let result = await Task.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Task.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  resp.send(result);
});

app.post("/project", verifyToken, async (req, resp) => {
  let project = new ProjectCollection(req.body);
  let result = await project.save();
  resp.send(result);
});

app.get("/myproject", verifyToken, async (req, resp) => {
  let projectCollection = await ProjectCollection.find();
  if (projectCollection.length > 0) {
    resp.send(projectCollection);
  } else {
    resp.send({ result: "No Task Found" });
  }
});

app.delete("/myproject/:id", verifyToken, async (req, resp) => {
  const result = await ProjectCollection.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/myproject/:id", verifyToken, async (req, resp) => {
  let result = await ProjectCollection.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    result.send({ result: "No Task Found" });
  }
});

app.put("/myproject/:id", verifyToken, async (req, resp) => {
  let result = await ProjectCollection.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});
app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await ProjectCollection.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    console.log("Middleware called if ", token);
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Plesae prvid valid token " });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Plesae add token " });
  }
}

// function verifyTokens(req, resp, next) {
//   console.log("Middleware called");
//   next();
// }
app.listen(3002);
