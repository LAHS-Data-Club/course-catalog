import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export const ProtectedRoute = () => {
  const { userQuery } = useContext(UserContext);
  if (userQuery.isPending) return <p>Loading...</p>;

  if (!userQuery.data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-slate-800 rounded p-15 border border-slate-700 flex flex-col justify-center items-center">
          <h3 className="text-4xl text-slate-200 mb-3">You are not signed in.</h3>
          <p className="mb-5">This feature requires you to be signed in.</p>
          <NeilsSignInComponent />
        </div>
      </div>
    );
  }

  return <Outlet />;
};

// :sob:
function NeilsSignInComponent() {
  function signIn() {
    const redirect = encodeURIComponent(window.location.href); // TODO: repeated logic
    window.location.href = `/api/login?redirect=${redirect}`;
  };

  return (
    <button
      onClick={signIn}
      type="submit"
      className="font-semibold cursor-pointer bg-blue-500 px-4 py-2 rounded shadow-md hover:bg-blue-500/70 transition flex"
    >
      <div className="w-8 h-8 bg-white rounded-4xl flex items-center justify-center">
        <FcGoogle size={25} />
      </div>
      <div className="font-bold text-md ml-2 self-center text-white">
        Continue with Google
      </div>
    </button>
  );
}