import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from '../../../axios-order';
import cookie from 'js-cookie';
import Navbar from '../../Navigation/Navbar';
import Router from 'next/router';
import { ShowProps } from '../Show/Show';

const Edit = ({ id }: ShowProps) => {
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

  // const router = useRouter();
  // const { id } = router.query;

  useEffect(() => {
    axios
      .get(`/campground/${id}`)
      .then(response => {
        setName(response.data.campground.name);
        setPrice(response.data.campground.price);
        setImage(response.data.campground.image);
        setDescription(response.data.campground.description);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const obj = {
      name: name,
      price: price,
      image: image,
      description: description,
    };
    const token = cookie.get('token');
    axios
      .patch(`/campground/${id}`, obj, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(() => {
        Router.push(`/campground/${id}`);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="text-center">Edit {name}</h3>
        <div style={{ width: '40%', margin: '25px auto' }}>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="price"
                className="form-control"
                value={price}
                onChange={handlePriceChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="image"
                className="form-control"
                value={image}
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
