import React, { useEffect, useState } from "react";
const IndividualEmp = ({ data }) => {
  const [list, setList] = useState([]);
  const [headlist, setheadList] = useState([]);
  const [slotlist, setslotList] = useState([]);
  const [mainlist, setmainlist] = useState([]);
  const [ptlist, setptlist] = useState([]);

  const [classlist, setclasslist] = useState([]);
  const [faclist, setfaclist] = useState([]);
  const [selectedfac, setselectedfac] = useState("");
  const [selectedclass, setselectedclass] = useState("");
  const [facid, setfacid] = useState("");
  const [error, seterror] = useState("");
  const [selectedmain, setselectedmain] = useState("");

  const getfacid = (a) => {
    // Check if the input matches each facility name and return the corresponding FAC_ID
    if (a === "Swimming Pool") {
      return "FAC001";
    } else if (a === "Gym") {
      return "FAC002";
    } else if (a === "Yoga Studio") {
      return "FAC003";
    } else if (a === "Basketball Court") {
      return "FAC004";
    } else if (a === "Tennis Court") {
      return "FAC005";
    } else if (a === "Squash Court") {
      return "FAC006";
    } else if (a === "Indoor Track") {
      return "FAC007";
    } else if (a === "Group Fitness Room") {
      return "FAC008";
    } else if (a === "Badminton Court") {
      return "FAC009";
    } else if (a === "Sauna") {
      return "FAC010";
    } else {
      // Handle cases where input does not match any facility
      return "Facility not found";
    }
  };

  const query = (data) => {
    let q = `select * from employee where emp_id= '${data}'`;
    return q; // Don't forget to return the query string
  };

  const handleAddition = async (queryString) => {
    // Renamed parameter to avoid shadowing
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
      setList(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition2 = async () => {
    let queryString = `select c.class_name, t.slot_id, t.weekday from trainers t, classes c where c.class_id= t.class_id and emp_id = '${data}'`;
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
        setslotList([]);
        return;
      }
      setslotList(responseData.sol);
      console.log(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition3 = async () => {
    let queryString = `select class_name from classes where head_id = '${data}'`;
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
      setheadList(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const getSlot = (value) => {
    if (value === "slot001") {
      return "morning";
    } else if (value === "slot002") {
      return "afternoon";
    } else if (value === "slot003") {
      return "evening";
    }
  };

  const handleAddition4 = async () => {
    let queryString = `select fac_name from facilities natural join maintains where emp_id = '${data}'`;
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
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      setmainlist(responseData.sol);
      console.log(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition5 = async () => {
    let queryString = `select c.first_name, c.last_name from customers c, employee e where c.trainer_id = e.emp_id and e.emp_id = '${data}'`;
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
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      setptlist(responseData.sol);
      console.log(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition6 = async () => {
    let queryString = `select class_name from classes`;
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
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      setclasslist(responseData.sol);
      console.log(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition7 = async () => {
    let queryString = `select fac_name from facilities`;
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
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      setfaclist(responseData.sol);
      console.log(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleclick = async (a, b, c) => {
    try {
      let q1;
      if (a === "none") {
        q1 = `update classes set head_id = NULL where class_name = '${a}'`;
      } else {
        q1 = `update classes set head_id = '${data}' where class_name = '${a}'`;
      }
      let q0 = `update classes set head_id = NULL where head_id = '${data}'`;

      let q2 = `insert into maintains values('${data}','${facid}')`;
      let q4 = `delete from maintains where emp_id = '${data}' and fac_id = '${getfacid(
        c
      )}'`;
      console.log(">>>>", a);
      console.log(">>>>", b);
      console.log(q1);
      console.log(q2);
      if (selectedclass.length != 0) {
        await handleAddition9(q0);
        await handleAddition9(q1);
      }
      if (selectedfac.length != 0) {
        await handleAddition9(q2);
      }
      if (selectedmain.length != 0) {
        await handleAddition9(q4);
      }
    } catch (error) {
      console.error("Error ", error);
      seterror("An error occurred while submitting the form.");
    }
    setselectedclass("");
    setselectedfac("");
    setselectedmain("");
  };
  const showdelsuccess = () => {
    seterror("success");
    handleAddition3();
    handleAddition4();
  };
  const showsuccess = () => {
    seterror("success");
    handleAddition3();
    handleAddition4();
  };

  const handleAddition9 = async (query) => {
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

      const responseData = await response.json();
      if (responseData.sol === "allgood") {
        showsuccess();
      }

      if (response.status === 500) {
        seterror(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handlemainChange = (e) => {
    const option = e.target.value;
    setselectedmain(option);
  };

  const handlefacChange = (e) => {
    const option = e.target.value;
    setselectedfac(option);
    handleAddition8(option);
  };

  const handleAddition8 = async (q) => {
    let queryString = `select fac_id from facilities where fac_name = '${q}'`;
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
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      setfacid(responseData.sol);
      console.log(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handledelete = async () => {
    let query = `delete from employee where emp_id = '${data}'`;
    await handleAddition9(query);
    showdelsuccess();
    setTimeout(() => {
      window.location.href = "/admin";
    }, 2000);
  };

  useEffect(() => {
    const initialQuery = query(data);
    handleAddition(initialQuery);
    handleAddition2();
    handleAddition3();
    handleAddition4();
    handleAddition5();
    handleAddition6();
    handleAddition7();
  }, [data]); // Add data as a dependency to re-run the effect when data changes
  return (
    <div className=" overflow-hidden w-screen h-screen bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 bg-opacity-70 min-h-screen flex justify-center items-center px-20 pt-2">
      <div className="flex flex-col bg-slate-600 bg-opacity-80 rounded-xl p-8 w-max border-4 border-black">
        <div className="bg-slate-300 bg-opacity-75 rounded-2xl p-10 flex flex-row">
          <table className="border-collapse border border-black rounded-md mx-auto">
            {/* Table header */}
            <thead className="bg-slate-500 bg-opacity-80 text-white ">
              <tr>
                <th className="px-4 py-2 border border-black">Customer ID</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2 border border-black">Middle Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2 border border-black">Email</th>
                <th className="px-4 py-2">Salary</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {list.map((member, index) => (
                <tr key={index} className="border border-black">
                  <td className="px-4 py-2 text-center border border-black">
                    {member[0]}
                  </td>
                  <td className="px-4 py-2 text-center">{member[1]}</td>
                  <td className="px-4 py-2 text-center border border-black">
                    {member[2]}
                  </td>
                  <td className="px-4 py-2 text-center">{member[3]}</td>
                  <td className="px-4 py-2 text-center border border-black">
                    {member[4]}
                  </td>
                  <td className="px-4 py-2 text-center">{member[6]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            onClick={handledelete}
            className=" mx-auto ml-5 h-fit w-20 p-1 bg-red-600 rounded-lg text-white text-center hover:cursor-pointer hover:bg-red-800 pt-1 hover:border-black hover:border-2 hover:shadow-md hover:shadow-black shadow-sm shadow-black"
          >
            Delete this employee
          </div>
        </div>
        <div className="flex flex-row justify-evenly align-middle mt-8">
          <div className="flex flex-col items-center mr-12 justify-center">
            <img
              className="w-40 h-40 rounded-full border-4 border-black shadow-lg"
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Coach"
            />
            <div className="p-5 bg-slate-300 bg-opacity-75 rounded-lg w-fit mx-auto mt-5">
              <div className="flex flex-row justify-center">
                <label htmlFor="option2">Head Coach:</label>
                <br />
                <select
                  id="option2"
                  className="ml-4 rounded-lg text-black border-2 border-black"
                  onChange={(e) => setselectedclass(e.target.value)}
                  value={selectedclass}
                >
                  <option value="">Select</option>
                  <option value="none">Remove as head Coach</option>
                  {classlist.map((plan, index) => (
                    <option key={index} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row my-5 justify-center">
                <label htmlFor="option2">Assign a Facility to Maintain:</label>
                <br />
                <select
                  id="option2"
                  className="ml-4 rounded-lg text-black border-2 border-black"
                  onChange={handlefacChange}
                  value={selectedfac}
                >
                  <option value="">Select</option>
                  {faclist.map((plan, index) => (
                    <option key={index} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row my-5 justify-center">
                <label htmlFor="option2">
                  Remove from Facility to Maintain:
                </label>
                <br />
                <select
                  id="option2"
                  className="ml-4 rounded-lg text-black border-2 border-black"
                  onChange={handlemainChange}
                  value={selectedmain}
                >
                  <option value="">Select</option>
                  {mainlist.map((plan, index) => (
                    <option key={index} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <div
                  onClick={() => {
                    handleclick(selectedclass, selectedfac, selectedmain);
                  }}
                  className=" mx-auto w-20 h-8 bg-green-600 rounded-lg text-white text-center hover:cursor-pointer hover:bg-green-700 pt-1 hover:border-black hover:border-2 hover:shadow-md hover:shadow-black shadow-sm shadow-black"
                >
                  Confirm
                </div>
                <div
                  className={
                    error != "success"
                      ? `text-red-600 text-center mt-3`
                      : `text-green-800 text-center mt-3`
                  }
                >
                  {error.slice(0, 9) === "ORA-04091"
                    ? "Employee is already a Head Coach of a Class"
                    : error.slice(0, 9) === "ORA-00001"
                    ? "Employee is already Assigned/Alloted"
                    : error.length === 0
                    ? ""
                    : error}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-300 bg-opacity-65 rounded-xl p-8 flex flex-col gap-4 overflow-auto h-96 mt-11">
            {/* Head Coach */}
            <div className="bg-slate-700 rounded-3xl p-4 flex items-center">
              <h3 className="text-white mr-2">Head Coach for:</h3>
              <ul>
                {headlist.length === 0 ? (
                  <li className="text-white">Is not a Head Coach</li>
                ) : (
                  headlist.map((facility, index) => (
                    <li key={index} className="text-white">
                      {facility[0]}
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* Takes Classes */}
            <div className="bg-slate-700 rounded-3xl p-4 flex items-center">
              <h3 className="text-white mr-2">Takes Classes:</h3>
              <ul>
                {slotlist.length === 0 ? (
                  <li className="text-white">Doesn't train any class</li>
                ) : (
                  slotlist.map((facility, index) => (
                    <li key={index} className="text-white">
                      {facility[0]} at {getSlot(facility[1])} on {facility[2]}
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* Maintains Facilities */}
            <div className="bg-slate-700 rounded-3xl p-4 flex items-center">
              <h3 className="text-white mr-2">Maintains Facilities:</h3>
              <ul>
                {mainlist.length === 0 ? (
                  <li className="text-white">
                    Doesn't maintain any facilities
                  </li>
                ) : (
                  mainlist.map((facility, index) => (
                    <li key={index} className="text-white">
                      {facility[0]}
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* Personal Trainer */}
            <div className="bg-slate-700 rounded-3xl p-4 flex items-center">
              <h3 className="text-white mr-2">Personal Trainer for:</h3>
              <ul>
                {ptlist.length === 0 ? (
                  <li className="text-white">
                    Doesn't personally train anyone
                  </li>
                ) : (
                  ptlist.map((facility, index) => (
                    <li key={index} className="text-white">
                      {facility[0]} {facility[1]}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualEmp;
