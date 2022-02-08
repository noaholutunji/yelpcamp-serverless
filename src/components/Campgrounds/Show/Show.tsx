import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import axios from '../../../axios-order';
import Table from './Table/Table';
import { useRouter } from 'next/router';
import Navbar from '../../Navigation/Navbar';

export interface IUser {
  sub: string;
}

export interface ICampground {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  owner: string;
}

export type ShowProps = {
  id: string;
};

const Show = ({ id }: ShowProps) => {
  const [campground, setCampground] = useState<ICampground | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  // const router = useRouter();
  // const { id } = router.query;

  useEffect(() => {
    const authUser = cookie.get('user');

    if (authUser) {
      setUser(JSON.parse(authUser));
    }

    axios
      .get(`/campground/${id}`)
      .then(response => {
        setCampground(response.data.campground);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const tabRow = () => {
    return (
      campground && (
        <Table
          obj={campground}
          userId={user ? user.sub : ''}
          key={campground.id}
        />
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">{tabRow()}</div>
    </>
  );
};

export default Show;
