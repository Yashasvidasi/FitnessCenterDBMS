import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import FilterComponent from "./filter.jsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deaf } from "fontawesome";

const FacilitiesList = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const handleAddition = async () => {
    let query = "select * from facilities";
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: query,
        }),
      });

      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }

      setMembers(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    handleAddition();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 bg-opacity-70 w-screen h-screen p-8 flex flex-col justify-center align-middle">
      <div className="text-black text-4xl font-semibold text-center mt-8 m-2">
        Facilities:{" "}
      </div>
      <div
        style={{ height: "65%" }}
        className="bg-slate-700 bg-opacity-80 border-4 mt-10 border-black w-fit mx-auto overflow-auto"
      >
        <table className="border-2 border-black text-white">
          <thead className="border-separate p-16 border-2 border-black ">
            <tr>
              <th className="p-4 border-2 border-black">Facility ID</th>
              <th className="p-4 border-2 border-black">Facility Name</th>
              <th className="p-4 border-2 border-black">Maintainence Cost</th>
            </tr>
          </thead>
          <tbody className="">
            {members.map((member, index) => (
              <tr
                key={index}
                className="hover:border-2 hover:border-black hover:cursor-pointer hover:shadow-md hover:shadow-black"
                onClick={() => {
                  navigate(`/admin/facilities/${member[0]}`);
                }}
              >
                <td className="px-8 py-2">{member[0]}</td>
                <td className="px-8">{member[1]}</td>
                <td className="px-8">{member[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilitiesList;
