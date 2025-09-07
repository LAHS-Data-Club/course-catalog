import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { userQuery } = useContext(UserContext);
  if (userQuery.isPending) return <p>Loading...</p>;

  if (!userQuery.data) {
    // TODO: repeated logic
    const redirect = encodeURIComponent(window.location.href);
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-slate-800 rounded p-15 border border-slate-700">
          <h3 className="text-4xl text-slate-200 mb-5">You are not signed in.</h3>
          <p>
            {'This feature requires you to be signed in. '}
            <a 
              href={`/api/login?redirect=${redirect}`}
              className="cursor-pointer underline text-blue-400 hover:text-blue-300"
            >
              Sign back in.
            </a>
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};