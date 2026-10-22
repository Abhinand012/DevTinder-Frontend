import { useSelector } from "react-redux";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="page-container">
        <div className="mb-8 text-center">
          <h1 className="page-title">Your Profile</h1>
          <p className="page-subtitle">
            Update your details and preview how others see you
          </p>
        </div>
        <div className="flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
          <ProfileEdit user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;
