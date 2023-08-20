import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../service/localStorage";
import { onRegister } from "../../service/apiRequest";

export function Registration({ setUser }) {

  const [fields, setFields] = useState({
    email: '',
    password: '',
    're-password': ''
  })
  const [err, setError] = useState('');
  const navigate = useNavigate();

  async function onSubmitHandler(e) {
    e.preventDefault();

    try {
      if (Object.values(fields).some(e => e === '')) {
        throw new Error('All fields are required!');
      }
      if (fields.password !== fields["re-password"]) {
        throw new Error('Password are not the same!');
      }

      await onRegister(fields.email, fields.password)
      const user = getUserData();
      setUser(user);
      navigate('/catalog');


    } catch (error) {
      setError(error)
    }
  }

  function onChangeHandler(e) {
    setFields(fields => {
      return { ...fields, [e.target.name]: e.target.value }
    })
  }

  return (
    <section id="register">
      <div className="form">
        <h2>Register</h2>
        {err ? <h3>{err.message}</h3> : ''}
        <form onSubmit={onSubmitHandler} className="login-form">
          <input
            onChange={onChangeHandler}
            value={fields.email}
            type="text"
            name="email"
            id="email"
            placeholder="email" />
          <input
            onChange={onChangeHandler}
            value={fields.password}
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <input
            onChange={onChangeHandler}
            value={fields["re-password"]}
            type="password"
            name="re-password"
            id="repeat-password"
            placeholder="repeat password"
          />
          <button type="submit">register</button>
          <p className="message">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </section>
  )
}