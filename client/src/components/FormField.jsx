//default value is temp
const FormField = ({ type, name, defaultValue }) => {
  return (
    <div>
      <label htmlFor={name} className="block">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        className="border w-full"
        type={type}
        id={name}
        name={name}
        required
        defaultValue={defaultValue || ""}
      />
    </div>
  );
};
export default FormField;
