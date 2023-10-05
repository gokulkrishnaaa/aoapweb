import axios from "axios";

const apiclient = axios.create({
  baseURL: "http://amritha.edu",
});

export default apiclient;
