import { NavLink } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <div className="text-7xl font-bold text-blue-400">404</div>
      <div>Oops... page not found</div>
      <div>
        why are you here? you should go{" "}
        <NavLink className="underline text-blue-400 italic" to="/">
          away
        </NavLink>{" "}
        now
      </div>
      {/** replace with a drawn version or smth lol */}
      <img
        className="h-30 mt-15 animate-spin"
        src="https://www.chesapeakebay.net/files/images/_1800xAUTO_crop_center-center_100_none/09.22_bald-eagle_Issue.jpg"
        alt=""
      />
    </div>
  );
}

export default PageNotFound;
