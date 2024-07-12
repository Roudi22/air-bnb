// show place details component
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import Spinner from "./Spinner";
import { AuthContext } from "../UserContext";
const ShowPlace = () => {
  const { placeId } = useParams();
  const { user, loading } = useContext(AuthContext);
  const [placeDetails, setPlaceDetails] = useState({});
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [booked, setBooked] = useState(false);
  console.log(placeId);
  useEffect(() => {
    console.log("fetching place details for", placeId);
    axios.get(`/place-details/${placeId}`).then((response) => {
      console.log(user);
      setPlaceDetails(response.data.place);
     
      if (response.data.place.bookings) {
        response.data.place.bookings.forEach((booking) => {
          if (booking === user.id) {
            setBooked(true);
          }
        });
      }
      console.log(booked);
    });
  }, [placeId, booked, user]);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-h-screen">
        <div className="p-8 grid place-content-center mt-28 gap-4">
          <div className="border z-50 fixed p-4 rounded-md bg-airbnb-red text-[#fff]">
            <button onClick={() => setShowAllPhotos(false)} className="">
              Hide photos
            </button>
          </div>
          {placeDetails.photos &&
            placeDetails.photos.map((photo) => {
              return (
                <div key={photo}>
                  <img
                    src={`http://localhost:3000/uploads/place-photos/${photo}`}
                    alt={placeDetails.title}
                    
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  
  if (loading || !placeDetails.photos) {
    return <Spinner />;
  }
  // fetch place details from the server by place id and set the placeDetails state

  return (
    <div className="mt-4 px-10 py-4 w-3/4 mx-auto">
      {/* place details */}
      <h1 className="text-2xl font-bold">{placeDetails.title}</h1>
      <a
        target="_blank"
        className="underline font-semibold"
        href={`https://maps.google.com/?q=${placeDetails.address}`}
      >
        {placeDetails.address}
      </a>
      <div className="relative">
        <div className={`${placeDetails.photos.length > 1 ? "grid" : ""} ${placeDetails.photos.length === 2 ? "grid-cols-[1fr_1fr]" : "grid-cols-[2fr_1fr]"} gap-2 gap-y-10`}>
          {/* {placeDetails.photos &&
            placeDetails.photos.map((photo) => {
              return (
                <img
                  key={photo}
                  src={`http://localhost:3000/uploads/place-photos/${photo}`}
                  alt={placeDetails.title}
                  className="w-1/4 rounded-lg object-cover"
                />
              );
            })} */}
          <div>
            {placeDetails.photos && (
              <img
                src={`http://localhost:3000/uploads/place-photos/${placeDetails.photos[0]}`}
                alt={placeDetails.title}
                className={`${placeDetails.photos.length > 1 ? "aspect-square" : ""} w-full rounded-lg object-cover`}
              />
            )}
          </div>
          <div className="grid">
            {placeDetails.photos.length > 1 && (
              <img
                src={`http://localhost:3000/uploads/place-photos/${placeDetails.photos[1]}`}
                alt={placeDetails.title}
                className="aspect-square rounded-lg object-cover"
              />
            )}
            <div className="overflow-hidden rounded-lg">
              {placeDetails.photos.length > 2 && (
                <img
                  src={`http://localhost:3000/uploads/place-photos/${placeDetails.photos[2]}`}
                  alt={placeDetails.title}
                  className="aspect-square rounded-lg relative top-2 object-cover"
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-5 bg-airbnb-red p-2 rounded-md text-[#fff]"
        >
          Show all photos
        </button>
      </div>
      <div className="grid grid-cols-[2fr_1fr]">
        <div className="max-w-2xl">
        <p className="py-8 border-b leading-8 tracking-wide border-[#ccc]">{placeDetails.description}</p>
        <div className="flex gap-4 py-8 text-xl border-b border-[#ccc]">
          <p>Check in: {placeDetails.checkIn}</p>
          <p>Check out: {placeDetails.checkOut}</p>
        </div>
        <p>Max guests: {placeDetails.maxGuests}</p>
        <div className="flex gap-4">
          {placeDetails.perks &&
            placeDetails.perks.map((perk) => {
              return <p key={perk}>{perk}</p>;
            })}
        </div>
        <p>{placeDetails.extraInfo}</p>

        </div>
            <BookingWidget booked={booked} setBooked={setBooked} placeId={placeId}/>
      </div>
    </div>
  );
};

export default ShowPlace;
