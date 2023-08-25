import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useDashboardContext } from "./Dashboard";

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

const File = () => {
  const { file } = useLoaderData();
  const { user } = useDashboardContext();

  const isShared = user.id != file.owner;

  return (
    <div>
      <Link to="/dashboard" className="underline hover:text-fuchsia-500">
        Back
      </Link>
      {isShared && <p className="mt-1 text-green-700">Shared File</p>}
      <p className="text-2xl my-2">{file.name}</p>
      <p>Created at: {file.createdAt}</p>
      {/* Download File Form */}
      <Form method="post" action={`download`}>
        <input type="text" name="name" value={file.name} hidden readOnly />
        <button
          type="submit"
          className="bg-fuchsia-500 text-white py-1 px-3 rounded-lg hover:bg-fuchsia-600">
          Download
        </button>
      </Form>
      {!isShared && (
        <>
          <Form method="patch" className="my-4" action={`update`}>
            <label htmlFor="is_public">Public</label>
            <input
              type="checkbox"
              className="w-4 h-4 mx-4"
              name="is_public"
              id="is_public"
              defaultChecked={file.is_public ? true : false}
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700">
              Submit
            </button>
          </Form>
          <Form method="post" action={`delete`}>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded-lg"
              type="submit">
              Delete File
            </button>
          </Form>
        </>
      )}
    </div>
  );
};

export default File;
