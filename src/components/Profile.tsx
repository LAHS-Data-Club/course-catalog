import { useContext } from "react";
import { PeriodsContext } from "./PeriodsContext";

function Profile () {
  const { periods, setPeriods } = useContext(PeriodsContext);
  function handleInputChange(e) {
    const { name, value } = e.target;
    setPeriods(prev => ({ ...prev, [name]: value,  }));
  }

  return (
    <div className="flex flex-col p-6 items-center justify-center h-full gap-7">
      <div className="bg-neutral-700 w-2/3 h-15 rounded-lg flex items-center py-4 px-6 gap-6">
        <button>Profile</button>
        <button>Friends</button>
      </div>
      <div className="bg-neutral-700 w-3/4 rounded flex px-10 py-7 justify-center gap-10 flex-wrap overflow-y-scroll">
        <div className="bg-neutral-600 min-w-60 flex-1 h-full rounded"></div>

        <div className="bg-neutral-600 flex-2 flex flex-col min-w-80 rounded p-6 gap-3 items-center">
          {Object.keys(periods).map(period => (
            <input 
              key={period}
              type="text" 
              name={period}
              placeholder={period.replace(/[{}]/g, '')}
              value={periods[period]}
              onChange={handleInputChange}
              className="text-black bg-neutral-300 rounded-md w-full p-2 pl-4"
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Profile;