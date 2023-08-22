import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import { createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch("/user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();
export const useDashboardContext = () => useContext(DashboardContext);

const Dashboard = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const logoutUser = async () => {
    navigate("/");
    const resp = await customFetch("/auth/logout");
    toast.success(resp.data.msg);
  };

  return (
    <DashboardContext.Provider value={{ user, logoutUser }}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Navbar />
          <div className="flex-grow p-8">
            {/* Can provide user to the app using context */}
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
