import { useSelector } from "react-redux";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="flex justify-center gap-10 py-2">
        <ProfileEdit user={user} />
      </div>
    )
  );
};

export default Profile;
