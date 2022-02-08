import React, { useState, SyntheticEvent } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import axios from '../../../axios-order';
import Navbar from '../../Navigation/Navbar';

const NewCampground = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPrice(event.target.value);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setImage(event.target.value);
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setDescription(event.target.value);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const data = {
      name,
      price,
      image,
      description,
    };
    const token = cookie.get('token');
    // console.log(token);
    axios
      .post('/campgrounds', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
        <h1 style={{ textAlign: 'center' }}>Create New Campground</h1>
        <div style={{ width: '40%', margin: '25px auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                required
                placeholder="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="price"
                required
                value={price}
                onChange={handlePriceChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="image"
                required
                value={image}
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                required
                placeholder="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewCampground;
