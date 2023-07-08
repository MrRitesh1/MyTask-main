import axios from "axios";

export default axios.create({
  // baseURL: "https://reqres.in/api",
  baseURL: "http://localhost:3002/myproject",
  headers: {},
});
