import { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../UserContext";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookies] = useCookies(["token"]);
  const menuRef = useRef();
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  }
  useEffect(() => {
    const closeMenu = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [menuOpen])

  return (
    <>
      <div className="sticky top-0">
        <header className="py-4 px-10 flex items-center w-full justify-between border-b bg-[#ffffff] border-[#dddddd]">
          <Link to={"/"} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 -rotate-90 text-airbnb-red"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            <span className="text-2xl hidden lg:block font-bold text-airbnb-red">
              Air-bnb
            </span>
          </Link>
          <div className="max-[600px]:hidden">
            <div className="flex items-center p-2 rounded-full border border-[#dddddd] shadow-md hover:shadow-lg transition duration-150 cursor-pointer">
              <div className="px-5 border-r border-[#dddddd] ">Anywhere</div>
              <div className="border-r px-5 border-[#dddddd]">Any week</div>
              <div className="px-5 text-[#b1b0b0]">Add guests</div>
              <button className="bg-airbnb-red rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="white"
                  className="w-4 h-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {menuOpen && (
            <div ref={menuRef} className="absolute shadow-md flex flex-col right-12 top-[70px] w-36 border gap-2 rounded-lg border-[#dddddd] bg-[#ffffff]">
              <div className="flex flex-col py-2 gap-2">
                <Link
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="hover:bg-[#f1f0f0] py-2 px-4"
                  to={"/login"}
                >
                  Login
                </Link>
                <Link
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="hover:bg-[#f1f0f0] py-2 px-4"
                  to={"/register"}
                >
                  Sign up
                </Link>
              </div>
            </div>
          )}
          {/* if the menu open and there is a user */}
          {menuOpen && isLoggedIn && (
            <div className="absolute shadow-md flex flex-col right-12 top-[70px] w-36 border gap-2 rounded-lg border-[#dddddd] bg-[#ffffff]">
              <div className="flex flex-col py-2 gap-2">
                <Link
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="hover:bg-[#f1f0f0] py-2 px-4"
                  to={"/profile"}
                >
                  Profile
                </Link>
                <Link
                  onClick={logout}
                  className="hover:bg-[#f1f0f0] py-2 px-4"
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
          <div
            onClick={toggleMenu}
            className="flex relative items-center border rounded-full px-1 py-2 border-[#dddddd] hover:shadow-lg cursor-pointer transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mx-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            { user  &&  (
              <div className="mx-2 max-[650px]:hidden">
                {user.name}
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
