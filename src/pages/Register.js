import { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirm: passwordConfirm,
      });

      setSuccess(true);
    } catch ({ response }) {
      //console.log(response.data.errors);
    }
  };

  if (success) {
    return <Redirect to={"/login"}></Redirect>;
  }

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 m-3 fw-normal">Please Register</h1>
        <div className="mb-3">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password_confirm">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={(e) => setpasswordConfirm(e.target.value)}
          />
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Register;
