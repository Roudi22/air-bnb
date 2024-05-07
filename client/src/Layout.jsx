import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"

const Layout = () => {
  return (
    <div>
        <Navbar />
        <ToastContainer autoClose={2000}/>
        <Outlet />
    </div>
  )
}

export default Layout