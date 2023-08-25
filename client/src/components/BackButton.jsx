import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const BackButton = ({ to }) => {
  return (
    <Link to={to} className="inline-flex items-center hover:text-fuchsia-500">
      <FaAngleLeft size={16} />
      Back
    </Link>
  );
};

export default BackButton;
