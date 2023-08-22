import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await customFetch(`/files/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg ?? error.message);
    return redirect("/dashboard");
  }
};

// use action for downloading file

const File = () => {
  const { file, url } = useLoaderData();
  const downloadFile = async () => {
    try {
      const { data } = await customFetch(`/files/${file.id}`);
      const { url } = data;

      // use axios?
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary anchor element to trigger the download
      const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);

      // Set the blob as the href and trigger a click on the anchor
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = file.name; // Set the desired filename
      a.click();

      // Clean up
      URL.revokeObjectURL(objectUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/dashboard" className="underline hover:text-fuchsia-500">
        Back
      </Link>
      <p className="text-2xl my-2">{file.name}</p>
      <p>Created at: {file.createdAt}</p>
      <button
        onClick={downloadFile}
        className="my-6 bg-fuchsia-500 text-white py-1 px-3 rounded-lg hover:bg-fuchsia-600">
        Download
      </button>
      <Form method="post" action={`../delete-file/${file.id}`}>
        <button
          className="bg-red-500 text-white py-1 px-3 rounded-lg"
          type="submit">
          Delete File
        </button>
      </Form>
    </div>
  );
};

export default File;
