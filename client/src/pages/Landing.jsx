import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="bg-slate-800 text-white flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-fuchsia-500 text-4xl font-bold mb-4">CloudX</h1>
      <p className="text-xl mb-16">Store and share your files easily!</p>
      <Link
        to="/dashboard"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded">
        Dashboard
      </Link>
      <div className="flex">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </main>
  );
};

export default Landing;
