import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import axios from "axios";

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const fileName = formData.get("name");
  try {
    const { data } = await customFetch(`/files/${params.id}/download`);
    const { url } = data;

    // tells Axios to treat the response as a blob
    const response = await axios(url, {
      responseType: "blob",
    });

    const blob = response.data;

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    // Set the blob as the href and trigger a click on the anchor
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = fileName;
    a.click();

    // Clean up
    URL.revokeObjectURL(objectUrl);
    document.body.removeChild(a);

    toast.success(data.msg);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg ?? error.message);
  }
  return redirect("../");
};
