import axios from "axios";

export default axios.create({
  baseURL: "https://sindra-onlineshopping.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});
