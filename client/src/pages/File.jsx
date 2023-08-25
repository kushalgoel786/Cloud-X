import { Form, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useDashboardContext } from "./Dashboard";
import { BackButton, DownloadButton, DeleteButton } from "../components";

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
      <BackButton to="/dashboard" />
      {isShared && <p className="mt-1 text-green-700">Shared File</p>}
      <div className="flex items-center">
        <div className="mr-10">
          <p className="text-2xl my-2">{file.name}</p>
          <p>Created at: {file.createdAt}</p>
        </div>
        {/* Download File Form */}
        <DownloadButton name={file.name} />
      </div>
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
          <DeleteButton />
        </>
      )}
    </div>
  );
};

export default File;
