import { useState } from "react";
import { onLogin } from "../../service/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "../../service/localStorage";

export function Login({ setUser }) {

  const [fields, setFields] = useState({
    email: '',
    password: '',
  })
  
  const [err, setError] = useState('');
  const navigate = useNavigate();

  function onSubmitHandler(e) {
    e.preventDefault();

    onLogin(fields.email, fields.password)
      .then(f => {
        const user = getUserData();
        setUser(user);
        navigate('/catalog')
      })
      .catch(err => setError(err))

  }

  function onChangeHandler(e) {
    setFields(fields => {
      return { ...fields, [e.target.name]: e.target.value }
    })
  }

  return (
    <section id="login">
      <div className="form">
        <h2>Login</h2>
        {err ? <h3>{err.message}</h3> : ''}
        <form onSubmit={onSubmitHandler} className="login-form">
          <input onChange={onChangeHandler} value={fields.email} type="text" name="email" id="email" placeholder="email" />
          <input
            onChange={onChangeHandler}
            value={fields.password}
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button type="submit">login</button>
          <p className="message">
            Not registered? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  )
}