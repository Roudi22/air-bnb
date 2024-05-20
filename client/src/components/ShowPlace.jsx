// show place details component
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ShowPlace = () => {
  const { placeId } = useParams();
  const [placeDetails, setPlaceDetails] = useState({});
  console.log(placeId);
  // fetch place details from the server by place id and set the placeDetails state
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        await axios
          .get("/place-details/" + placeId)
          .then((res) => {
            console.log(res.data.place);
            setPlaceDetails(res.data.place);
          });
      } catch (error) {
        console.log({ placeId: placeId });
        console.log(error);
      }
    };
    fetchPlaceDetails();
  }, [placeId]);
  return (
    <div>
      <h1>Show Place {placeId}</h1>
      {/* place details */}
      <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg">
        <h1 className="text-2xl font-bold">{placeDetails.title}</h1>
        <p>{placeDetails.description}</p>
        <p>{placeDetails.address}</p>
        <div className="flex gap-4">
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
        <div className="flex gap-4">
          {placeDetails.photos &&
            placeDetails.photos.map((photo) => {
              return (
                <img
                  key={photo}
                  src={`http://localhost:3000/uploads/place-photos/${photo}`}
                  alt={placeDetails.title}
                  className="w-1/4 rounded-lg object-cover"
                />
              );
            })}
        </div>
        </div>
    </div>
  );
};

export default ShowPlace;
