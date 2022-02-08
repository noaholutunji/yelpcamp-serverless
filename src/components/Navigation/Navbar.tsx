import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';

const Navbar = () => {
  const logout = () => {
    cookie.remove('token');
    cookie.remove('user');
    Router.push('/campgrounds');
  };

  const user = cookie.get('token');

  return (
    <div>
      <nav className="navbar navbar-default bg-info">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-collapse"
              aria-expanded="false"
              aria-controls="navbar-collapse"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link href="/">
              <a className="navbar-brand">YelpCamp</a>
            </Link>
          </div>
          <div
            className="collapse navbar-collapse"
            id="navbar-collapse"
            aria-expanded="false"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link href="/campgrounds">
                  <a>Campgrounds</a>
                </Link>
              </li>
              {!user ? (
                <>
                  <li>
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/register">
                      <a>Signup</a>
                    </Link>
                  </li>
                </>
              ) : (
                <li onClick={logout}>
                  <a className="mt-5" style={{ cursor: 'pointer' }}>
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
