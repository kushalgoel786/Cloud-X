import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const resp = await customFetch.patch(`/files/${params.id}`, data);
    toast.success(resp.data.msg);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg ?? error.message);
  }
  return redirect("../");
};
