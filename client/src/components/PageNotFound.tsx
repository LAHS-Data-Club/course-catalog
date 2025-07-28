import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col justify-center h-screen items-center bg-slate-900">
      <div className="text-7xl font-light text-blue-500 mb-4">404</div>
      <div className="text-slate-100 text-lg mb-2">Oops... page not found</div>
      <div className="text-slate-400">
        why are you here? you should go{" "}
        <NavLink className="underline text-blue-400 italic hover:text-blue-300 transition-colors duration-200" to="/">
          away
        </NavLink>{" "}
        now
      </div>
      <img
        className="h-32 mt-16 animate-spin opacity-80"
        src="https://www.chesapeakebay.net/files/images/_1800xAUTO_crop_center-center_100_none/09.22_bald-eagle_Issue.jpg"
        alt=""
      />
    </div>
  );
}

export default PageNotFound;
