import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
// Inside your functional component

const ClassesList = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totallength, setotallength] = useState(0);

  const membersPerPage = 10;

  const [filter, setFilter] = useState({
    selectedTime: [],
    selectedDays: [],
    selectedClass: "",
    selectedOption: "",
    selectedafterDate: "",
    selectedbeforeDate: "",
    duemin: 0,
    duemax: 0,
  });

  const query = () => {
    let query =
      "SELECT cl.class_id, cl.class_name, f.fac_name, e.first_name, e.last_name, (SELECT COUNT(DISTINCT c.customer_id) FROM customers c, takes_slots t WHERE c.customer_id = t.customer_id AND t.class_id = cl.class_id GROUP BY t.class_id) FROM classes cl FULL OUTER JOIN employee e ON cl.head_id = e.emp_id NATURAL JOIN facilities f";

    return query;
  };

  const handleAddition = async (query) => {
    console.log(query);
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

      setClasses(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    handleAddition(query());
  }, []);

  const getcard = (class2) => {
    return (
      <div
        onClick={() => navigate(`/admin/classes/${class2[0]}`)}
        key={class2}
        className="flex flex-col justify-center w-72 mb-16 items-center p-12 border-2 border-black bg-slate-400 rounded-xl shadow-md shadow-black hover:cursor-pointer hover:bg-slate-500 hover:shadow-xl hover:shadow-black"
      >
        <img
          className="rounded-full h-36 w-36 object-cover border-4 border-black shadow-black shadow-lg"
          src="https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Swimming Pool"
        />
        <p className="mt-10 mb-2">{class2[1]}</p>
        <p className="mb-2 text-center">
          Head Coach:{" "}
          {class2[3] === null ? "Not assigned" : class2[3] + " " + class2[4]}
        </p>
        <p className="mb-2">Currently enrolled: {class2[5]}</p>
      </div>
    );
  };

  return (
    <div className="overflow-hidden h-screen bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 w-screen p-12 flex flex-col align-middle justify-center">
      <div className="text-4xl text-center mb-10 font-bold">
        Current Classes:
      </div>
      <div
        style={{ height: "92%" }}
        className="rounded-2xl overflow-auto flex flex-row flex-wrap align-middle justify-evenly bg-slate-700 bg-opacity-70 border-8 border-black p-12"
      >
        {classes.map((item, index) => {
          return getcard(item);
        })}
      </div>
    </div>
  );
};

export default ClassesList;
