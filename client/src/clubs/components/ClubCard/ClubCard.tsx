import "./ClubCard.css";
import { NavLink } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import type { Club } from "../../lib/types";
import { parseLocation } from "../../functions/utilities";

export default function ClubCard({ c }: { c: Club }) {
  return (
    <NavLink to={c.url}>
      <div
        className={
          (c.name === "Data Club" ? " glow " : " ") +
          "group sm:h-70 lg:h-90 flex cursor-pointer flex-col rounded p-5 ring-1 ring-slate-200/80 transition-all hover:shadow-xl hover:ring-blue-500/50 dark:ring-slate-700 dark:hover:ring-blue-500/50 bg-white dark:bg-slate-800 drop-shadow-xl"
        }
      >
        <h4 className="text-lg font-bold">
          {c.name}
        </h4>
        <div className="my-2 flex flex-col gap-2 mb-3">
          <div className="flex items-start gap-1">
            <FaRegCalendarAlt className="w-6 h-6" />
            <div className="align-baseline">
              {c.day} {c.time}
            </div>
          </div>
          <div className="flex items-start gap-1">
            <IoLocationOutline className="w-6 h-6" />
            <div>{parseLocation(c.location)}</div>
          </div>
        </div>
        <p className="line-clamp-6 dark:text-slate-400">
          {c.description}
        </p>
      </div>
    </NavLink>
  );
}