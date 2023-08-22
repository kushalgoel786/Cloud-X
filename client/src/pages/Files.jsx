import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch("/files");
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg ?? error.message);
    return error;
  }
};

const Files = () => {
  const { files } = useLoaderData();

  if (files.length === 0) {
    return <h2>No Files</h2>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-3">Your Files</h2>
      {files.map(({ id, name }) => (
        <Link
          to={`./file/${id}`}
          key={id}
          // onClick={() => downloadFile(id, name)}
          className="block p-1 hover:text-fuchsia-700 cursor-pointer">
          {name}
        </Link>
      ))}
    </div>
  );
};

export default Files;
