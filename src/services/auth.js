import http from "./http";

const auth = {
  login(credentials) {
    return http.post("login", credentials);
  },

  logout() {
    return http.get("auth/logout");
  },

  setUser(user) {
    localStorage.setItem("user", user);
  },

  getUser() {
    return localStorage.getItem("user");
  },

  setAccessToken(token) {
    localStorage.setItem("token", token);
  },

  getAccessToken() {
    return localStorage.getItem("token");
  },
};

export default auth;
