import React, { useEffect, useState } from "react";
const Individual = ({ data }) => {
  const [list, setList] = useState([]);
  const [faclist, setfacList] = useState([]);
  const [reclist, setrecList] = useState([]);
  const [slotlist, setslotList] = useState([]);
  const [tid, settid] = useState("");
  const [tpopup, settpopup] = useState(false);
  const [trainers, settrainers] = useState([]);
  const [selectedtrainer, setselectedtrainer] = useState("");
  const query = (data) => {
    let q = `select * from customers c left outer join employee e on (c.trainer_id = e.emp_id) where customer_id = '${data}'`;
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
    let queryString = `select f.fac_name from uses u, facilities f where f.fac_id= u.fac_id and customer_id = '${data}'`;
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
      setfacList(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAdditiontr = async () => {
    let queryString = `select emp_id, first_name, last_name from employee`;
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
      settrainers(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition3 = async () => {
    let queryString = `select r.rec_desc from customers c, records r where r.holder_id= c.customer_id and c.customer_id = '${data}'`;
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
      setrecList(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };
  const handleAddition5 = async (query) => {
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
        //showsuccess1();
      }

      if (response.status === 500) {
        //setError1(responseData.error);
        //reset();
        //console.log(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  const handleAddition4 = async () => {
    let queryString = `select cl.class_name, t.slot_id, t.weekday from classes cl, customers c, takes_slots t where c.customer_id = t.customer_id and cl.class_id = t.class_id and t.customer_id = '${data}'`;
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
      setslotList(responseData.sol);
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

  useEffect(() => {
    const initialQuery = query(data);
    handleAddition(initialQuery);
    handleAddition2();
    handleAddition3();
    handleAddition4();
    handleAdditiontr();
  }, [data]); // Add data as a dependency to re-run the effect when data changes

  const handlesubmit = async (a) => {
    let query1;
    if (a === "none") {
      query1 = `update customers set trainer_id = NULL where customer_id = '${data}'`;
    } else {
      query1 = `update customers set trainer_id = '${a}' where customer_id = '${data}'`;
    }

    await handleAddition5(query1);
    const initialQuery = query(data);
    handleAddition(initialQuery);
    setTimeout(() => {
      settpopup(false);
      setselectedtrainer("");
    }, 800);
  };

  return (
    <div className=" bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 h-screen w-screen pt-7">
      <div className="text-black text-center text-4xl font-semibold">
        {" "}
        MEMBER DETAILS:
      </div>
      <div className="bg-slate-300 bg-opacity-75 mx-10 mt-6 p-12 rounded-2xl">
        <div className=" ">
          <table className="border-2 border-black rounded-md">
            {/* Table header */}
            <thead className="border-separate p-16 border-2 border-black bg-slate-500 bg-opacity-70 ">
              <tr>
                <th className="px-2 border-2 border-black">Customer ID</th>
                <th className="px-2">First Name</th>
                <th className="px-2 border-2 border-black">Middle Name</th>
                <th className="px-2">Last Name</th>
                <th className="px-2 border-2 border-black">Email</th>
                <th className="px-2">Age</th>
                <th className="px-2 border-2 border-black">Plan ID</th>
                <th className="px-2">Payment Method</th>
                <th className="px-2 border-2 border-black">
                  Last Payment Date
                </th>
                <th className="px-2">Balance</th>
                <th className="px-2 border-2 border-black">Trainer Name</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {list.map((member, index) => (
                <tr key={index} className="border-2 border-black">
                  <td className="text-center border-2 border-black">
                    {member[0]}
                  </td>
                  <td className="text-center ">{member[1]}</td>
                  <td className="text-center border-2 border-black">
                    {member[2]}
                  </td>
                  <td className="text-center">{member[3]}</td>
                  <td className="text-center border-2 border-black">
                    {member[4]}
                  </td>
                  <td className="text-center">{member[6]}</td>
                  <td className="text-center border-2 border-black">
                    {member[7]}
                  </td>
                  <td className="text-center">{member[8]}</td>
                  <td className="text-center border-2 border-black">
                    {member[9]}
                  </td>
                  <td className="text-center">{member[10]}</td>
                  <td className="text-center border-2 border-black">
                    {member[13] !== null
                      ? member[13] + " " + member[15]
                      : "No personal trainer"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-row justify-evenly ">
        <div className="mt-16 ml-24 flex flex-col justify-between ">
          <img
            className="rounded-full border-4 border-black shadow-lg shadow-black h-60 w-60 mx-auto"
            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"
            style={{ borderRadius: "50%" }}
          ></img>
          <button
            onClick={() => settpopup(true)}
            className="bg-slate-700 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded border-2 border-white mb-8"
          >
            Assign/unassign Trainer
          </button>
        </div>
        <div className="bg-slate-300 bg-opacity-65 mx-16 mt-12 p-10 flex flex-col align-top w-fit h-96 rounded-xl overflow-auto">
          <div className="flex flex-row p-3 border-2 border-black bg-slate-700 mb-9 rounded-3xl">
            <h3 className="mx-12 mr-2" style={{ color: "white" }}>
              Facility Taken:{" "}
            </h3>
            <ul className="mx-12 ml-2 ">
              {faclist.map((facility, index) => (
                <li key={index} style={{ color: "white" }}>
                  {facility}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row p-3 border-2 border-black bg-slate-700 rounded-3xl mb-9">
            <h3 className="mx-12 mr-2" style={{ color: "white" }}>
              Record Held:{" "}
            </h3>
            <ul className="mx-12 ml-2">
              {reclist.map((facility, index) => (
                <li key={index} style={{ color: "white" }}>
                  {facility}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row p-3 border-2 border-black bg-slate-700 rounded-3xl">
            <h3 className="mx-12 mr-2" style={{ color: "white" }}>
              Slots taken:{" "}
            </h3>
            <ul className="mx-12 ml-2">
              {slotlist.map((facility, index) => (
                <li key={index} style={{ color: "white" }}>
                  {facility[0]} at {getSlot(facility[1])} on {facility[2]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {tpopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <div className="">
              <label htmlFor="option" className="text-lg mr-12">
                Choose trainer:
              </label>
              <select
                id="option"
                className="mt-2 p-1"
                onChange={(e) => setselectedtrainer(e.target.value)}
                value={selectedtrainer}
              >
                <option value="">Select</option>
                <option value="none">Dealloc trainer</option>
                {trainers.map((plan, index) => (
                  <option key={index} value={plan[0]}>
                    {plan[1] + " " + plan[2]}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="bg-green-600 hover:bg-green-800 text-white px-2 py-2 mt-5 rounded"
              onClick={() => handlesubmit(selectedtrainer)}
            >
              Confirm
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 text-white px-2 py-2 mt-5 rounded mx-3"
              onClick={() => settpopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Individual;
