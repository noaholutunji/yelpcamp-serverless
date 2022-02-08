import React, { useState, SyntheticEvent } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import axios from '../../axios-order';
import Navbar from '../../components/Navigation/Navbar';

const Verify = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCode(event.target.value);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      email,
      code,
    };
    axios
      .post('/verify', data)
      .then(response => {
        Router.push('/campgrounds');
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Verify Code</h1>
        <div style={{ width: '30%', margin: '25px auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                required
                placeholder="code"
                value={code}
                onChange={handleCodeChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verify;
