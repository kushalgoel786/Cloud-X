import { Form, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import axios from "axios";
import { toast } from "react-toastify";

const uploadFile = async (url, file) => {
  const resp = await axios.put(url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return resp;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const file = formData.get("name");

  // Max File size, 5MB
  if (file.size > 5000000) {
    toast.error("File size can be 5 Mb Max");
    return null;
  }

  try {
    const resp = await customFetch.post("/files", { name: data.name.name });
    const { url } = resp.data;

    // use form data and pass it directly?
    const resp2 = uploadFile(url, file);

    toast.success("Upload Successful");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg ?? error.message);
    return error;
  }
};

const Upload = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      {/* for form data api to include file and not only json */}
      <Form method="post" encType="multipart/form-data">
        <h3 className="text-xl mb-1">Select File</h3>
        <input
          className="border"
          id="file"
          type="file"
          name="name"
          //   accept="image/*"
          required
        />
        <button
          type="submit"
          className="block text-lg mt-4 bg-fuchsia-500 text-white py-1 px-4 rounded-lg"
          disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Submit"}
        </button>
      </Form>
    </div>
  );
};

export default Upload;
