import React, { useState, SyntheticEvent } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import Link from 'next/link';
import axios from '../../axios-order';
import Navbar from '../../components/Navigation/Navbar';

const Register = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    axios
      .post('/register', data)
      .then(response => {
        if (response.data) {
          cookie.set('token', response.data.idToken);
          cookie.set('user', JSON.stringify(response.data));
          Router.push('/verify');
        } else {
          console.log('Register Error');
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Register</h1>
        <div style={{ width: '30%', margin: '25px auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                required
                type="email"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                required
                type="password"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
          <p style={{ paddingTop: '10px' }}>
            <Link href="/login" as="/login">
              <a>Click here to login</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
