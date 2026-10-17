import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const ProfileEdit = ({ user }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const handleUpdateProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h3 className="text-xl mx-auto">Profile</h3>

        <label className="label">FirstName</label>
        <input
          type="text"
          className="input"
          value={firstName}
          placeholder="FirstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="label">LastName</label>
        <input
          type="text"
          className="input"
          value={lastName}
          placeholder="LastName"
          onChange={(e) => setLastName(e.target.value)}
        />
        <label className="label">Photo url</label>
        <input
          type="text"
          className="input"
          value={photoUrl}
          placeholder="photoUrl"
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <label className="label">Age</label>
        <input
          type="text"
          className="input"
          value={age}
          placeholder="age"
          onChange={(e) => setAge(e.target.value)}
        />
        <label className="label">Gender</label>
        <select
          className="p-3 border rounded-lg bg-base-100"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option>male</option>
          <option>female</option>
          <option>other</option>
        </select>
        <label className="label">about</label>
        <textarea
          className="border h-20 p-2"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>

        <button className="btn btn-success mt-4" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </fieldset>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
