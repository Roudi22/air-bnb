import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BookingWidget = (prop) => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [nights, setNights] = useState(1);
    const navigate = useNavigate();
  console.log(prop.placeId);
  const handleClick = (id, bookedNights) => {
    axios
      .post(
        "/book-place",
        { placeId: id, nights: bookedNights},
        {
          headers: {
            Authorization: `${cookies.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Place booked successfully");
        prop.setBooked(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
          navigate("/login");
      });
  };
  return (
    <div className="border border-[#ccc] rounded-md shadow-xl p-8 mt-4 flex-col text-center">
      <h1 className="text-xl font-bold mb-4">Book your stay now!</h1>
      <h2>Price per night: 40$</h2>
      {prop.booked ? (
         <p>You booked this place</p>
      ) : (
        <>
        <input type="number" value={nights} onChange={e => setNights(e.target.value)} className="block p-2 border rounded-md my-4"/>

        <button
        onClick={() => handleClick(prop.placeId, nights)}
        className="btn bg-airbnb-red text-[#fff] rounded-md p-2 w-full"
      >
        Book Now
      </button>
        
        </>
      )}
    </div>
  );
};

export default BookingWidget;
