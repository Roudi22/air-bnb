import { useState } from "react"
import { toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => { 
    e.preventDefault()
    await axios.post("/register", {
      name: name,
      email: email,
      password: password
    }).then((res) => {
      console.log(res.data);
      toast.success("Success Notification !", {
        position: "top-center"
      }, {autoClose: 2000});
      
      navigate('/')
    }).catch((err) => {
      console.log(err.response.data.message);
      toast.error(err.response.data.message, {
        position: "top-center"
      });
    });
    
  }
  return (
    <div>
        <div className="flex full-height items-center justify-center px-3">
            <div className="mt-4 rounded-lg shadow-xl">
            <h1 className="text-xl p-4 font-bold text-center">Sign up</h1>
            <form className="flex flex-col p-4">
                <h2 className="text-2xl mb-6"> Welcome to Airbnb</h2>
                <input
                type="text"
                className="border-t border-l border-r p-4 rounded-t-lg"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input
                type="email"
                className="border p-4"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}

                />
                <input
                type="password"
                className="border-b border-r border-l p-4 rounded-b-lg"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <p className="mt-2 text-sm">
                We’ll call or text you to confirm your number. Standard message and
                data rates apply. Privacy Policy
                </p>
                <button onClick={handleSubmit} type="submit" className="border py-3 button-gradient">
                Sign up
                </button>
            </form>
            </div>
        </div>
        
    </div>
  )
}

export default RegisterPage