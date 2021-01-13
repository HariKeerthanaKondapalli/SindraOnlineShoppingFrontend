import axios from "axios";

export default axios.create({
  baseURL: "http://sindra-onlineshopping.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});