import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    const { data } = await customFetch.delete(`/files/${params.id}`);
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg ?? error.message);
  }
  return redirect("/dashboard");
};
