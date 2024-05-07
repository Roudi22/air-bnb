import React, {useState} from "react";
import CreatePlaceButton from "./CreatePlacePage";
import { useContext } from "react";
import { AuthContext } from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreatePlaceForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleCreatePlace = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/create-place", {
        title,
        description,
        address,
        photos: addedPhotos,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        userId: user.id,
      });
      toast.success(data.message);
      navigate("/profile/places");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // function to handle checkboxes
  const handleCbClick = (e) => {
    if (e.target.checked) {
      const newPerks = [...perks, e.target.name];
      setPerks(newPerks);
      console.log(newPerks);
    } else {
      const newPerks = perks.filter((perk) => perk !== e.target.name);
      setPerks(newPerks);
      console.log(newPerks);
    }
  };
  // function to handle uploaded photos
  const handleUploadPhoto = (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    axios.post("/uploads/place-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      setAddedPhotos([...addedPhotos, ...res.data]);
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/upload-photo", {
       link: photoLink,
     });
      setAddedPhotos([...addedPhotos, data.photo]);
      setPhotoLink("");
    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <div className="flex flex-col mt-6 shadow-2xl p-4 rounded-lg">
      <h1 className="text-center text-2xl font-semibold">Create a new place</h1>
      <form className="flex flex-col gap-4 mt-8">
        <input
          className="border rounded-sm border-[#ccc] p-3"
          type="text"
          placeholder="Title for your place"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <input
          className="border rounded-sm border-[#ccc] p-3"
          type="text"
          placeholder="Description of your place"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <input
          className="border rounded-sm border-[#ccc] p-3"
          type="text"
          placeholder="Address"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        {/* input photo field as files */}
        <label className="text-[#333] text-xl">Photos</label>
        <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Add a photo using a link ..."
          className="border rounded-sm border-[#ccc] p-3 flex-1"
          onChange={(e) => setPhotoLink(e.target.value)}
          value={photoLink}
        />
        <button onClick={handleAddPhoto} className="bg-[#ececec] p-2 rounded-sm">Add Photo</button>

        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-2 lg:grid-cols-6">
          {addedPhotos.length > 0 && addedPhotos.map((photo) => (
              <div className="flex" key={photo}>
                <img src={`http://localhost:3000/uploads/place-photos/${photo}`} alt="photo" className="rounded-2xl object-cover "/>
              </div>
          ))}

          <label className="bg-[#f5f5f5] text-xl border flex justify-center items-center border-[#ccc] rounded-xl p-4 cursor-pointer hover:bg-[#ffffff] transition-all duration-500">
            <input multiple type="file" className="hidden" onChange={handleUploadPhoto}/>
            + Upload
          </label>
        </div>

        {/* perks checkboxes*/}
        <label className="text-[#333] text-xl">Perks</label>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <input onChange={handleCbClick} type="checkbox" id="wifi" name="wifi"/>
            <label htmlFor="wifi">Wifi</label>
          </div>
          <div className="flex items-center gap-2">
            <input onChange={handleCbClick} type="checkbox" id="kitchen" name="kitchen" />
            <label htmlFor="kitchen">Kitchen</label>
          </div>
          <div className="flex items-center gap-2">
            <input onChange={handleCbClick} type="checkbox" id="parking" name="parking" />
            <label htmlFor="parking">Parking</label>
          </div>
          <div className="flex items-center gap-2">
            <input onChange={handleCbClick} type="checkbox" id="pool" name="pool" />
            <label htmlFor="pool">Pool</label>
          </div>
          <div className="flex items-center gap-2">
            <input onChange={handleCbClick} type="checkbox" id="gym" name="gym" />
            <label htmlFor="gym">Gym</label>
          </div>
        </div>

        <input
          className="border rounded-sm border-[#ccc] p-3"
          type="text"
          placeholder="Extra info"
          name="extraInfo"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {/* check in */}
        <label className="text-[#333] text-xl">Check In</label>
        <input
          className="border rounded-sm border-[#ccc] p-3"
          type="date"
          placeholder="Check In"
          onChange={(e) => setCheckIn(e.target.value)}
          value={checkIn}
        />
          
          {/* check out */}
        <label className="text-[#333] text-xl">Check Out</label>
        <input
          className="border rounded-sm border-[#ccc] p-3"
          type="date"
          placeholder="Check Out"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
          
          {/* max guests */}
        <label className="text-[#333] text-xl">Max Guests</label>
        <input
          className="border rounded-sm border-[#ccc] p-3"
          type="number"
          placeholder="Max Guests"
          min={1}
          onChange={(e) => setMaxGuests(e.target.value)}
          value={maxGuests}
        />


        <button onClick={handleCreatePlace} className="bg-airbnb-red w-full rounded-full p-2 text-[#fff] font-bold">
          Create Place
        </button>
      </form>
    </div>
  );
};

export default CreatePlaceForm;
