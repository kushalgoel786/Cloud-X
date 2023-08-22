import { useDashboardContext } from "./Dashboard";

const Profile = () => {
  const { user } = useDashboardContext();
  return <div>Hello, {user.name} </div>;
};

export default Profile;
