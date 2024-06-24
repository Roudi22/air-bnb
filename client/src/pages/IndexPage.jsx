import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import PlaceCard from "../components/PlaceCard"
const IndexPage = () => {
  // Define state variables
  const [places, setPlaces] = useState([])
  // Define effect
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("/all-places")
        setPlaces(response.data)
        console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPlaces()
  }, [])
  return (
    <div className="px-10">
      <h1 className='text-2xl font-bold'>Places</h1>
      <div className='grid gap-4 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2'>
        {places.map((place) => {
          return (
            <PlaceCard key={place._id} place={place}/>
          )
        })}
      </div>
    </div>
  )
}

export default IndexPage