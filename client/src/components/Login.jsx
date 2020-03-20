import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import lock from '../assets/lock.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const { login } = useContext(AuthContext);
  async function onSubmit(e) {
    e.preventDefault();
    login({ email, password, remember });
  }
  return (
    <form className="form-signin text-center" onSubmit={onSubmit}>
      <img className="mb-4" src={lock} alt="" width="72" height="72"></img>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        onChange={e => setEmail(e.target.value)}
        className="form-control"
        placeholder="Email address"
        value={email}
        autoFocus={true}
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        onChange={e => setPassword(e.target.value)}
        className="form-control"
        placeholder="Password"
        value={password}
      />
      <div className="checkbox mb-3">
        <label>
          <input
            type="checkbox"
            value="remember-me"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember me
        </label>
      </div>
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <p className="mt-5 mb-3 text-muted">&copy; Renato Macêdo</p>
    </form>
  );
}
