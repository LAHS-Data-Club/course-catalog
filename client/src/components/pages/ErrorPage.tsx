import { NavLink } from "react-router-dom";

// TODO: this is rly ugly but it literally doesnt matter
function ErrorPage() {
  return (
    <div className="flex flex-col justify-center h-screen items-center bg-slate-900">
      <div className="text-7xl font-light text-blue-500 mb-4 max-w-200 p-4 text-center">Oops :l Something went wrong</div>
      <div className="text-slate-400">
        you can try to go back to{" "}
        <NavLink className="underline text-blue-400 italic hover:text-blue-300 transition-colors duration-200" to="/">
          home
        </NavLink>{" "}
        lol
      </div>
    </div>
  );
}

export default ErrorPage;
