import "./ClubCard.css";
import { NavLink } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import type { Club } from "../../lib/types";

export default function ClubCard({ c }: { c: Club }) {
  const formattedLocation = !Number.isNaN(c.location)
    ? "Room " + c.location
    : c.location;
  return (
    <NavLink to={c.url}>
      <div
        className={
          (c.name === "Data Club" ? " glow " : " card ") +
          "text-md lg:text-base bg-slate-600/40 p-5 rounded drop-shadow-xl font-body lg:flex lg:flex-col h-90"
        }
      >
        <p className="font-display text-base lg:text-xl font-semibold">
          {c.name}
        </p>
        <div className="my-2 flex flex-col gap-2 mb-3">
          <div className="flex items-start gap-1">
            <FaRegCalendarAlt className="w-6 h-6" />
            <div className="align-baseline">
              {c.day} {c.time}
            </div>
          </div>
          <div className="flex items-start gap-1">
            <IoLocationOutline className="w-6 h-6" />
            <div>{formattedLocation}</div>
          </div>
        </div>
        <p className="line-clamp-6">{c.description}</p>
      </div>
    </NavLink>
  );
}
