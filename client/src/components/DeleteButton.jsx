import { Form } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const DeleteButton = () => {
  return (
    <Form method="post" action={`delete`}>
      <button
        className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
        type="submit">
        <FaTrash size={16} />
        <span className="ml-2 text-lg">Delete</span>
      </button>
    </Form>
  );
};

export default DeleteButton;
