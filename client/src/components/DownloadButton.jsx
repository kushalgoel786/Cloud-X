import { Form } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";

const DeleteButton = ({ name }) => {
  return (
    <Form method="post" action={`download`}>
      <input type="text" name="name" value={name} hidden readOnly />
      <button
        type="submit"
        className="inline-flex items-center bg-fuchsia-500 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600">
        <FaCloudDownloadAlt size={24} />
        <span className="ml-3 text-lg">Download</span>
      </button>
    </Form>
  );
};
export default DeleteButton;
