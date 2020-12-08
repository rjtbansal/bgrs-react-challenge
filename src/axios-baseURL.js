import axios from "axios";

const instance = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://swapi.dev/api/"
});

export default instance;