/* eslint-disable react/prop-types */
import React from 'react'

const PlaceCard = (props) => {
  return (
    <div>
        <div className='flex flex-col gap-4 p-4 border border-gray-300 rounded-lg'>
            <h1 className='text-2xl font-bold'>{props.place.title}</h1>
            <p>{props.place.description}</p>
            <p>{props.place.address}</p>
            <div className='flex gap-4'>
            <p>Check in: {props.place.checkIn}</p>
            <p>Check out: {props.place.checkOut}</p>
            </div>
            <p>Max guests: {props.place.maxGuests}</p>
            <div className='flex gap-4'>
            {props.place.perks.map((perk) => {
                return (
                <p key={perk}>{perk}</p>
                )
            })}
            </div>
            <p>{props.place.extraInfo}</p>
            <div className='flex gap-4'>
            {props.place.photos.map((photo) => {
                return (
                <img key={photo} src={`http://localhost:3000/uploads/place-photos/${photo}`} alt={props.place.title} className='w-1/4 rounded-lg'/>
                )
            })}
            </div>
        </div>
    </div>
  )
}

export default PlaceCard