import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-11e15.firebaseio.com/"
});

export default instance;
