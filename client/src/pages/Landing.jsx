import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="bg-slate-800 text-white flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-fuchsia-500 text-4xl font-bold mb-4">CloudX</h1>
      <p className="text-xl mb-12">Store and share your files easily!</p>
      <Link
        to="/dashboard"
        className="mb-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded">
        Dashboard
      </Link>
      <p className="text-lg font-medium">
        <Link to="/register" className="transition hover:text-fuchsia-500">
          Register
        </Link>
        &nbsp;or&nbsp;
        <Link to="/login" className="transition hover:text-fuchsia-500">
          Login
        </Link>
      </p>
    </main>
  );
};

export default Landing;
