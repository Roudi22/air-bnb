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
  const [formOpen, setFormOpen] = useState(false)
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
      { formOpen ? <CreatePlaceForm setFormOpen={setFormOpen}/> : <button onClick={() => setFormOpen(true)} className='bg-airbnb-red text-white p-2 rounded-lg'>Create a new place</button> }
      <div className='grid md:grid-cols-2 gap-2 lg:grid-cols-3'>
      {userPlaces.length > 0 ? (
        userPlaces.map((place) => {
          return (
            
            <PlaceCard key={place._id} place={place} />
            
          )
        })
      ) : (
        <div className='text-center'>You have no places yet. Create one now!</div>
      )}

      </div>
    </div>
  )
}

export default CreatePlacePage