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
      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start">
        <fieldset className="fieldset glass-card w-full max-w-sm gap-1 p-6">
          <legend className="fieldset-legend px-2 text-base font-semibold">
            Edit Details
          </legend>

          <label className="label pt-2">First Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label pt-2">Last Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label pt-2">Photo URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={photoUrl}
            placeholder="https://..."
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <label className="label pt-2">Age</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={age}
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label pt-2">Gender</label>
          <select
            className="select select-bordered w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="default">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="label pt-2">About</label>
          <textarea
            className="textarea textarea-bordered h-24 w-full resize-none"
            value={about}
            placeholder="Tell others about yourself..."
            onChange={(e) => setAbout(e.target.value.toLowerCase())}
          />

          <button
            className="btn btn-primary mt-4 w-full"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>
        </fieldset>

        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-base-content/60">Live Preview</p>
          <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div
            className={`alert ${
              toastType === "success" ? "alert-success" : "alert-error"
            } shadow-lg`}
          >
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
