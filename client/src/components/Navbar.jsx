import { useDashboardContext } from "../pages/Dashboard";

const Navbar = () => {
  const { logoutUser } = useDashboardContext();
  return (
    <nav className="bg-fuchsia-700 flex justify-between items-center px-10 h-12 text-white">
      <div>CloudX</div>
      <button onClick={logoutUser} className="px-2 border rounded">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
