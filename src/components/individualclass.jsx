import React, { useEffect, useState } from "react";

const IndividualClass = ({ data }) => {
  const [list, setList] = useState([[], [], [], [], [], [], []]);
  const [listmax, setlistmax] = useState([1, 2, 3]);
  const [head, sethead] = useState([1, 2, 3]);
  const [listtrainers, setlisttrainers] = useState([1, 2, 3]);
  const [main, setmain] = useState([]);

  const query = (data) => {
    console.log(data);
    let q = `SELECT c.class_id, c.slot_id, c.weekday, c.current_alloc, (SELECT m.max_allowed FROM max_slots m WHERE c.class_id = m.class_id AND c.slot_id = m.slot_id) FROM current_slots c WHERE c.class_id = '${data}' ORDER BY CASE c.weekday WHEN 'Monday' THEN 1 WHEN 'Tuesday' THEN 2 WHEN 'Wednesday' THEN 3 WHEN 'Thursday' THEN 4 WHEN 'Friday' THEN 5 WHEN 'Saturday' THEN 6 ELSE 7 END`;
    return q; // Don't forget to return the query string
  };

  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleAddition = async (queryString) => {
    // Renamed parameter to avoid shadowing
    console.log(queryString);
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: queryString, // Use the parameter passed to the function
        }),
      });

      const responseData = await response.json();
      console.log(">>>>>", responseData.sol);
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }

      if (responseData.sol.length === 0) {
        setList([[], [], [], [], [], [], []]);
        return;
      }
      let x = checker(responseData.sol);
      console.log(x);
      setList(x);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition2 = async (data) => {
    // Renamed parameter to avoid shadowing
    let queryString = `select * from max_slots where class_id = '${data}'`;
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: queryString, // Use the parameter passed to the function
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      setlistmax(responseData.sol);
      console.log(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition3 = async (data) => {
    // Renamed parameter to avoid shadowing
    console.log(data);
    let queryString = `select e.first_name, e.last_name from trainers t, employee e where e.emp_id = t.emp_id and t.class_id = '${data}'`;
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: queryString, // Use the parameter passed to the function
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      setlisttrainers(responseData.sol);
      console.log(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };
  const handleAddition4 = async (data) => {
    // Renamed parameter to avoid shadowing
    console.log(data);
    let queryString = `select c.class_name, e.first_name, e.last_name from classes c full outer join employee e on (e.emp_id = c.head_id) where c.class_id = '${data}'`;
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: queryString, // Use the parameter passed to the function
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      if (responseData.sol.length === 0) {
        sethead(responseData.sol);
      }
      sethead(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const checker = (l) => {
    const mapByDay = new Map(l.map((arr) => [arr[2], arr]));
    const resultArray = week.map((day) => mapByDay.get(day) || []);
    console.log(resultArray);
    return resultArray;
  };

  useEffect(() => {
    handleAddition4(data);
    handleAddition(query(data));
    handleAddition2(data);
    handleAddition3(data);
  }, []);

  const getSlot = (value) => {
    if (value === "slot001") {
      return "morning";
    } else if (value === "slot002") {
      return "afternoon";
    } else if (value === "slot003") {
      return "evening";
    }
  };

  return (
    <div className="overflow-auto bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 bg-opacity-70 h-screen w-screen p-12">
      <div className="text-4xl text-center text-white">
        {head[0] === null ? "huh" : head[0][0]}
      </div>
      <div className="flex flex-row justify-between  h-fit">
        <div
          style={{ height: "514px" }}
          className="self-start flex flex-col mt-16 w-96 justify-center align-middle border-4 border-white p-16 bg-slate-400 bg-opacity-70"
        >
          <img
            className="rounded-full h-36 w-36 object-cover border-4 border-black shadow-black shadow-lg mx-auto"
            src="https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Swimming Pool"
          />
          <br />
          <br />
          <div className="text-xl font-bold text-center text-black underline">
            Head Coach:
          </div>
          <div className="text-xl font-semibold text-center text-black">
            {head[0][1] === null
              ? "Not assigned"
              : head[0][1] + " " + head[0][2]}
          </div>
          <br />
          <br />
          <div className="text-xl font-bold text-center text-black underline">
            Trainers:
          </div>
          <div className="">
            {listtrainers.length != 0 ? (
              listtrainers.map((item, index) => (
                <div key={index} className="trainer-card">
                  <p className="text-xl font-semibold text-center text-black">
                    {item[0]} {item[1]}
                  </p>
                </div>
              ))
            ) : (
              <div className="trainer-card">
                <p className="text-xl font-semibold text-center text-black">
                  Not assigned
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          style={{ height: "514px" }}
          className="bg-slate-500 border-4 h-screen border-white w-fit flex flex-col mx-10 mt-16 flex-grow overflow-auto"
        >
          <div className="text-4xl text-white text-center p-4">
            WEEKLY-SLOTS
          </div>
          <div className="bg-slate-800 border-2 border-stone-400 text-2xl text-white p-2 m-2 mb-3">
            {list[0].length != 0
              ? list[0][2] + " " + getSlot(list[0][1])
              : "Monday Not assigned"}
            <br />
            {"Student Strength: " + list[0][3] + "/" + list[0][4]}
          </div>

          <div className="bg-slate-800 border-2 border-stone-400 text-2xl text-white p-2 m-2 mb-3">
            {list[1].length != 0
              ? list[1][2] + " " + getSlot(list[1][1])
              : "Tuesday Not assigned"}
            <br />
            {"Student Strength: " + list[1][3] + "/" + list[1][4]}
          </div>
          <div className="bg-slate-800 border-2 border-stone-400 text-2xl text-white p-2 m-2 mb-3">
            {list[2].length != 0
              ? list[2][2] + " " + getSlot(list[2][1])
              : "Wednesday Not assigned"}
            <br />
            {"Student Strength: " + list[2][3] + "/" + list[2][4]}
          </div>
          <div className="bg-slate-800 border-2 border-stone-400 text-2xl text-white p-2 m-2 mb-3">
            {list[3].length != 0
              ? list[3][2] + " " + getSlot(list[3][1])
              : "Thursday Not assigned"}
            <br />
            {"Student Strength: " + list[3][3] + "/" + list[3][4]}
          </div>
          <div className="bg-slate-800 border-2 border-stone-400 text-2xl text-white p-2 m-2 mb-3">
            {list[4].length != 0
              ? list[4][2] + " " + getSlot(list[4][1])
              : "Friday Not assigned"}
            <br />
            {"Student Strength: " + list[4][3] + "/" + list[4][4]}
          </div>
          <div className="bg-slate-800 border-2 border-stone-400 text-2xl text-white p-2 m-2 mb-3">
            {list[5].length != 0
              ? list[5][2] + " " + getSlot(list[5][1])
              : "Saturday Not assigned"}
            <br />
            {"Student Strength: " + list[5][3] + "/" + list[5][4]}
          </div>
          <div className="bg-slate-800 border-2 border-stone-400 text-2xl text-white p-2 m-2 mb-3">
            {list[6].length != 0
              ? list[6][2] + " " + getSlot(list[6][1])
              : "Sunday Not assigned"}
            <br />
            {"Student Strength: " + list[6][3] + "/" + list[6][4]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualClass;
