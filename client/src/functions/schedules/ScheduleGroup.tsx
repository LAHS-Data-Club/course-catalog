import { useState } from "react";
import type { Group, User } from "../../lib/types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Schedule from "./Schedule";

interface Props {
  user: User;
  group: Group;
}

// const dummyDataGroup = {
//   id: "1",
//   title: "Group 1",
//   owner_id: "user1",
//   members: [
//     {
//       google_id: "user1",
//       name: "John Doe",
//       email: "0e0H0@example.com",
//       schedule: {
//         "{Period 1}": "ADEN",
//         "{Period 2}": "Math 1C/1D/2B (Multivariable Calculus)",
//         "{Period 3}": "AP Studio Art",
//         "{Period 4}": "AP Physics C",
//         "{Period 5}": "Innovative Design Capstone",
//         "{Period 6}": "AP Literature and Composition",
//         "{Period 7}": "AP Microeconomics",
//       },
//     },
//     {
//       google_id: "user2",
//       name: "Jane Smith",
//       email: "jsmith@example.com",
//       schedule: {
//         "{Period 1}": "AP Chemistry",
//         "{Period 2}": "AP Statistics",
//         "{Period 3}": "US History",
//         "{Period 4}": "AP English Language",
//         "{Period 5}": "Graphic Design",
//         "{Period 6}": "AP Biology",
//         "{Period 7}": "Precalculus Honors",
//       },
//     },
//     {
//       google_id: "user3",
//       name: "Michael Johnson",
//       email: "mjohnson@example.com",
//       schedule: {
//         "{Period 1}": "Computer Science Principles",
//         "{Period 2}": "AP Calculus BC",
//         "{Period 3}": "AP Physics C",                  // overlaps with John (different period)
//         "{Period 4}": "PE",
//         "{Period 5}": "AP Microeconomics",             // overlaps with John (different period)
//         "{Period 6}": "AP English Language",
//         "{Period 7}": "Spanish 4 Honors",
//       },
//     },
//     {
//       google_id: "user4",
//       name: "Emily Davis",
//       email: "edavis@example.com",
//       schedule: {
//         "{Period 1}": "Band",
//         "{Period 2}": "AP Literature and Composition", // overlaps with John
//         "{Period 3}": "US History",
//         "{Period 4}": "AP Biology",                    // overlaps with Jane
//         "{Period 5}": "AP Studio Art",                 // overlaps with John
//         "{Period 6}": "Trigonometry",
//         "{Period 7}": "Health",
//       },
//     },
//     {
//       google_id: "user5",
//       name: "Alex Nguyen",
//       email: "anguyen@example.com",
//       schedule: {
//         "{Period 1}": "Innovative Design Capstone",    // overlaps with John
//         "{Period 2}": "Math 1C/1D/2B (Multivariable Calculus)", // overlaps with John
//         "{Period 3}": "AP Government",
//         "{Period 4}": "AP Physics C",                  // overlaps with John/Michael
//         "{Period 5}": "Journalism",
//         "{Period 6}": "AP Statistics",                 // overlaps with Jane
//         "{Period 7}": "AP Microeconomics",             // overlaps with John/Michael
//       },
//     },
//     {
//       google_id: "user6",
//       name: "Sara Lee",
//       email: "slee@example.com",
//       schedule: {
//         "{Period 1}": "AP Studio Art",                 // overlaps with John/Emily
//         "{Period 2}": "AP Chemistry",                  // overlaps with Jane
//         "{Period 3}": "AP Literature and Composition", // overlaps with John/Emily
//         "{Period 4}": "AP Statistics",                 // overlaps with Jane/Alex
//         "{Period 5}": "Innovative Design Capstone",    // overlaps with John/Alex
//         "{Period 6}": "AP Calculus BC",                // overlaps with Michael
//         "{Period 7}": "Spanish 4 Honors",              // overlaps with Michael
//       },
//     },
//   ],
// };

export default function ScheduleGroup({ user, group }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0); 

  // TODO: have gpt generate some more of this lol
  // const dummyGroup = { ...dummyDataGroup, members: [...dummyDataGroup.members, {
  //   google_id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   schedule: {
  //       "{Period 1}": "ADEN",
  //       "{Period 2}": "Math 1C/1D/2B (Multivariable Calculus)",
  //       "{Period 3}": "AP Studio Art",
  //       "{Period 4}": "AP Physics C",
  //       "{Period 5}": "Innovative Design Capstone",
  //       "{Period 6}": "AP Literature and Composition",
  //       "{Period 7}": "AP Microeconomics",
  //     },
  // }] };

  return (
    <div>
      <div className="">
        <button>Overview</button>
        <button>Share</button> {/** TODO: invite function */}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button 
          onClick={() => setSelectedIndex((selectedIndex - 1) % group.members.length)}
          className="hover:bg-slate-800 rounded py-2 px-1 cursor-pointer transition"
        >
          <FaAngleLeft size={25} />
        </button>

        <Schedule user={user} group={group} member={group.members[selectedIndex]} />

        <button
          onClick={() => setSelectedIndex((selectedIndex + 1) % group.members.length)}
          className="hover:bg-slate-800 rounded py-2 px-1 cursor-pointer transition"
        >
          <FaAngleRight size={25} />
        </button>
      </div>
    </div>
  );
}

