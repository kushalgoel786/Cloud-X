import { useNavigation } from "react-router-dom";

const SubmitButton = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-fuchsia-600 text-white rounded">
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};
export default SubmitButton;
