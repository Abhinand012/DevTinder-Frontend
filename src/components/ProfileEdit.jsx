import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const ProfileEdit = ({ user }) => {
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender || "default");
  const [about, setAbout] = useState(user.about);

  const handleUpdateProfile = async () => {
    setShowToast(false);

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

      setToastType("success");
      setToastMessage("Profile updated successfully.");
      setShowToast(true);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to update profile.";

      setToastType("error");
      setToastMessage(
        typeof message === "string" ? message : "Failed to update profile.",
      );
      setShowToast(true);
    }

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h3 className="text-xl mx-auto">Profile</h3>

        <label className="label">First Name</label>
        <input
          type="text"
          className="input"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label">Last Name</label>
        <input
          type="text"
          className="input"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label">Photo URL</label>
        <input
          type="text"
          className="input"
          value={photoUrl}
          placeholder="Photo URL"
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="label">Age</label>
        <input
          type="text"
          className="input"
          value={age}
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label">Gender</label>
        <select
          className="p-3 border rounded-lg bg-base-100"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="default">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label className="label">About</label>
        <textarea
          className="border h-20 p-2"
          value={about}
          onChange={(e) => setAbout(e.target.value.toLowerCase())}
        />

        <button className="btn btn-success mt-4" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </fieldset>

      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />

      {showToast && (
        <div className="toast toast-top toast-center">
          <div
            className={`alert ${
              toastType === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
