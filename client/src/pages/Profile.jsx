import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import { AuthContext } from "../UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import CreatePlacePage from "../components/CreatePlacePage";
import UserBookingsPage from "./UserBookingsPage";

const Profile = () => {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const [user] = useState(JSON.parse(window.localStorage.getItem("user")));
  let { subpage } = useParams();
  if (!subpage) {
    subpage = "profile";
  }
  useEffect(() => {
    console.log(user);
  })
  // logout function
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const logout = async () => {
    try {
      await axios.post("/logout");
      navigate("/");
      setIsLoggedIn(false);
      toast.info("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
    }
  };
  // function to change the class of the selected link
  function activeLink(link) {
    return link === subpage || (subpage === undefined && link === "profile")
      ? "bg-button-gradient text-[#fff] rounded-full"
      : "text-[#000]";
  }
  return (
    <>
      <div>
        <nav className="w-full max-[418px]:flex-col flex mt-4 gap-4 justify-center">
          <Link className={`p-2 text-center ${activeLink("profile")}`} to={"/profile"}>
            My Profile
          </Link>
          <Link className={`p-2 text-center ${activeLink("bookings")}`} to={"/profile/bookings"}>
            My Bookings
          </Link>
          <Link className={`p-2 text-center ${activeLink("places")}`} to={"/profile/places"}>
            My Accommodations
          </Link>
        </nav>
        {subpage === "profile" && (
          <div className="flex flex-col gap-2 max-w-2xl text-center mx-auto mt-8 ">
            <h1 className="text-3xl font-bold">You are logged in as {user.name}</h1>
            <button onClick={logout} className=" bg-airbnb-red w-full rounded-full p-2 text-[#fff] font-bold">Logout</button>
          </div>
        )}
        {subpage === "places" && <CreatePlacePage/>}
        {subpage === "bookings" && <UserBookingsPage/>}
      </div>
    </>
  );
};

export default Profile;
