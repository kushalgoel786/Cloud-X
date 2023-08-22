import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <div>
        <h1>Error</h1>
        <h3>This Page does not exist</h3>
        <Link to="/dashboard">Go back to dashboard</Link>
      </div>
    );
  }
  return <h1>Something went wrong</h1>;
};
export default Error;
