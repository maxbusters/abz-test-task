import axios from "axios";
axios.defaults.baseURL =
  "https://frontend-test-assignment-api.abz.agency/api/v1/";

export default {
  getUsersbyPage(page) {
    return axios.get(`/users?count=6&page=${page}`);
  },
  getUsersPositions() {
    return axios.get(`/positions`);
  },
  getToken() {
    return axios.get(`/token`);
  },
  addUser(user, token) {
    return axios.post(`/users`, user, {
      headers: {
        Token: token,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
