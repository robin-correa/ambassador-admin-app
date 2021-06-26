import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import auth from "../../services/auth";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.request.use(
  (request) => {
    request.headers.authorization = `Bearer ${auth.getAccessToken()}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    let mounted = true;
    axios
      .get("users", {
        cancelToken: source.token,
      })
      .then(({ data }) => {
        setUsers(data.data);
      })
      .catch((e) => {
        if (!mounted) {
          return;
        }
        setError(e.message);
        setloading(false);
      })
      .finally(() => {
        if (!mounted) {
          return;
        }
        setloading(false);
      });

    return () => {
      mounted = false;
      source.cancel("Unmounted");
    };
  }, []);
  return <h2>Users</h2>;
};

export default withRouter(Users);
