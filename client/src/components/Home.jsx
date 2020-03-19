import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { logout, getData, data, error } = useContext(AuthContext);

  return (
    <div className="container d-flex justify-content-center flex-column">
      <h1>You are logged in</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <button className="btn btn-primary" onClick={getData}>
        Get Some Data
      </button>
      <button className="btn btn-danger" onClick={logout}>
        Log Out
      </button>
      {data.length > 0 && data.map((el, i) => <h2 key={i}>{el}</h2>)}
    </div>
  );
}
