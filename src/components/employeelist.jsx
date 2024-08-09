import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import FilterComponent from "./filter.jsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deaf } from "fontawesome";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const handleAddition = async () => {
    let query = "select * from employee order by emp_id";
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

  const [searchQuery, setSearchQuery] = useState("");

  // Filter the members based on the search query
  const filteredMembers = members.filter(
    (member) =>
      member[1].toLowerCase().includes(searchQuery.toLowerCase()) ||
      member[2].toLowerCase().includes(searchQuery.toLowerCase()) ||
      member[3].toLowerCase().includes(searchQuery.toLowerCase()) ||
      member[4].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 bg-opacity-70 w-screen h-screen p-8 flex flex-col justify-center align-middle">
      <div className="text-white text-4xl font-bold text-center mt-8 m-2">
        EMPLOYEES:{" "}
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-1 mx-auto mt-4  rounded mb-2 w-96"
      />
      <div
        style={{ height: "83%" }}
        className="bg-slate-700 bg-opacity-80 border-4 mt-1 border-white w-fit mx-auto overflow-auto rounded-2xl flex flex-col"
      >
        <table className="border-2 border-black text-white">
          <thead className="border-separate p-16 border-2 border-black ">
            <tr>
              <th className="p-4 border-2 border-black">Employee_id</th>
              <th className="p-4 border-2 border-black">First Name</th>
              <th className="p-4 border-2 border-black">Middle Name</th>
              <th className="p-4 border-2 border-black">Last Name</th>
              <th className="p-4 border-2 border-black">Email</th>
              <th className="p-4 border-2 border-black">Salary</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredMembers.map((member, index) => (
              <tr
                key={index}
                className="hover:border-2 hover:border-black hover:cursor-pointer hover:shadow-md hover:shadow-black"
                onClick={() => {
                  navigate(`/admin/employees/${member[0]}`);
                }}
              >
                <td className="px-8 py-2">{member[0]}</td>
                <td className="px-8">{member[1]}</td>
                <td className="px-8">{member[2]}</td>
                <td className="px-8">{member[3]}</td>
                <td className="px-8">{member[4]}</td>
                <td className="px-4">{member[6]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
