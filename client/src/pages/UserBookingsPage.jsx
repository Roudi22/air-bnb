import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import PlaceCard from '../components/PlaceCard'
const UserBookingsPage = () => {
    const [bookings, setBookings] = useState([])
    const [cookies] = useCookies(['token'])
    useEffect(() => {
        axios.get('/bookings', {
            headers: {
                Authorization: `${cookies.token}`
            }
        }).then((res) => {
            setBookings(res.data.bookings)
            console.log(res.data)
        })
    }, [ cookies.token])
  return (
    <div className='grid md:grid-cols-2 gap-2 lg:grid-cols-3'>
        {bookings.map((booking) => {
            return (
                <PlaceCard key={booking._id} place={booking.place} />
            )
        })}
    </div>
  )
}

export default UserBookingsPage