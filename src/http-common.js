import axios from "axios";

export default axios.create({
  //For testing purpose I changed baseURL to localhost later while deploying change it...
  baseURL: "https://sindra-onlineshopping.herokuapp.com/",
  // baseURL:"http://localhost:8080",
  headers: {
    "Content-type": "application/json"
  }
});