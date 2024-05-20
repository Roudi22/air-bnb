import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from 'axios'
import IndexPage from "./pages/IndexPage";
import Profile from "./pages/Profile";
import { AuthContext, AuthProvider } from "./UserContext";
import ShowPlace from "./components/ShowPlace";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
function App() {
  return (
    // Wrap the Routes component with the AuthProvider
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>} />
        <Route path="/profile/:subpage?" element={<Profile/>} />
        <Route path="/profile/:subpage/:action" element={<Profile/>} />
        {/* Route to show place details */}
        <Route path="profile/places/details/:placeId" element={<ShowPlace/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        
      </Route>
    </Routes>
    </AuthProvider>
  );
}

export default App;
