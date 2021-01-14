import axios from "axios";

export default axios.create({
<<<<<<< HEAD
  //For testing purpose I changed baseURL to localhost later while deploying change it...
  baseURL: "https://sindra-onlineshopping.herokuapp.com/",
  // baseURL:"http://localhost:8080",
=======
  baseURL: "https://sindra-onlineshopping.herokuapp.com/",
>>>>>>> 9ee2199e0cd00f4b5d1378107ef814baeec53622
  headers: {
    "Content-type": "application/json"
  }
});
