import { FaUserCircle } from "react-icons/fa";

// TODO: include data about user
// and make it less ugly
export default function Profile() {
  // this is so incredibly ugly but i dont care
  return (
    <div className="flex flex-col ">
      <div className="flex w-full lg:w-100 items-center justify-center mb-6 p-7 rounded-sm bg-slate-700">
        <FaUserCircle size={200} className="text-slate-400 dark:text-slate-500" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Neil Marwah</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">100032891@mvla.net</p>
      </div>
    </div>
  );
}
