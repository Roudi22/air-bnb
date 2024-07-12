/* eslint-disable react/prop-types */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from "react-router-dom";
const PlaceCard = (props) => {
  return (
    <div>
      <div className="flex flex-col p-4 rounded-lg">
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
        <div className="max-md:flex max-md:justify-between max-md:items-center md:flex-col">
          <div>
            <h2 className="font-bold">{props.place.title}</h2>
            <p>The owner: {props.place.owner.name}</p>
            <p>Check in: {props.place.checkIn}</p>
          </div>
          <Link to={`/profile/places/details/${props.place._id}`}>
            <button className="text-[#fff] p-1 bg-airbnb-red w-full mt-1 rounded-lg">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
