/* eslint-disable react/prop-types */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from "react-router-dom";
const PlaceCard = (props) => {
  return (
    <div>
      <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg">
        <div>
          <Carousel showThumbs={false}>
            {props.place.photos.map((photo) => {
              return (
                <img
                  key={photo}
                  src={`http://localhost:3000/uploads/place-photos/${photo}`}
                  alt={props.place.title}
                  className="rounded border aspect-[1/1] object-cover border-airbnb-red"
                  
                />
              );
            })}
          </Carousel>
        </div>
        <h1 className="text-2xl font-bold">{props.place.title}</h1>
        <p>{props.place.description}</p>
        <div className="flex gap-4">
          <p>Check in: {props.place.checkIn}</p>
        </div>
        <Link to={`/profile/places/details/${props.place._id}`}>
          <button className="bg-airbnb-red text-[#fff] border border-[#000] p-2 rounded-lg">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceCard;
