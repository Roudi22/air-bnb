// show place details component
import React from 'react'
import { useParams } from 'react-router-dom'
const ShowPlace = () => {
    const { placeId } = useParams()
    console.log(placeId)
  return (
    <div>
        <h1>Show Place {placeId}</h1>
        {/* place details */}
        
    </div>
  )
}

export default ShowPlace