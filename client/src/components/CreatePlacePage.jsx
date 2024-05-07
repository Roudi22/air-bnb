import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import CreatePlaceForm from './CreatePlaceForm'
import PlaceCard from './PlaceCard'
import { useContext } from 'react'
import { AuthContext } from '../UserContext'
import axios from 'axios'
const CreatePlacePage = () => {
  
  const { action } = useParams()
  const [userPlaces, setUserPlaces] = useState([])
  const user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null
  console.log({userId:user.id})
  // fetch user places from the server by user id and set the userPlaces state
  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        await axios.get("/user-places", {params: {userId: user.id}})
          .then((res) => {
            console.log(res.data.places)
            setUserPlaces(res.data.places)
          })
      } catch (error) {
        console.log({userId:user.id})
        console.log(error)
      }
    }
    fetchUserPlaces()
  }, [user.id])
  return (
    <div className='flex flex-col p-10'>
      {action === 'new' ? (
        <CreatePlaceForm/>
      ) : (
        <Link to={"/profile/places/new"} className="bg-airbnb-red text-center mb-4 w-full rounded-full p-2 text-[#fff] font-bold">
            Create Place
        </Link>
      )}
      {userPlaces.length > 0 ? (
        userPlaces.map((place) => {
          return (
            <Link to={`/profile/places/${place._id}`} key={place._id}>
            <PlaceCard key={place._id} place={place} />
            </Link>
          )
        })
      ) : (
        <div className='text-center'>You have no places yet. Create one now!</div>
      )}
    </div>
  )
}

export default CreatePlacePage