/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { AuthContext } from "../UserContext";
const LoginPage = () => {
  const [cookies,setCookie] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          setCookie("token", res.data.token);
          setIsLoggedIn(true);
          setUser(res.data.user);
          window.localStorage.setItem("user", JSON.stringify(res.data.user));
          console.log(res.data.user);
          toast.success("Login Successfull !")
          navigate("/");
        })
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className="flex full-height items-center justify-center px-3">
      <div className="mt-4 rounded-lg shadow-xl">
        <h1 className="text-xl p-4 font-bold text-center">Log in</h1>
        <form className="flex flex-col p-4">
          <h2 className="text-2xl mb-6"> Welcome to Airbnb</h2>
          <input
            type="email"
            className="border p-4 rounded-t-lg"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="border-b border-r border-l p-4 rounded-b-lg"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="mt-2 text-sm">
            We’ll call or text you to confirm your number. Standard message and
            data rates apply. Privacy Policy
          </p>
          <button onClick={handleLogIn} type="submit" className="border py-3 button-gradient">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
