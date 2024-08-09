import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const [List, setList] = useState([]);

  let weeklist = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let slotlist = ["Morning", "Afternoon", "Evening"];

  const [slotData1, setSlotData1] = useState([]);
  const [slotData2, setSlotData2] = useState([]);
  const [slotData3, setSlotData3] = useState([]);
  const [slotData4, setSlotData4] = useState([]);
  const [slotData5, setSlotData5] = useState([]);
  const [slotData6, setSlotData6] = useState([]);
  const [slotData7, setSlotData7] = useState([]);
  const [slotData, setSlotData] = useState([[], [], [], [], [], [], []]);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data1 = await getslotcode("Sunday");
        const data2 = await getslotcode("Monday");
        const data3 = await getslotcode("Tuesday");
        const data4 = await getslotcode("Wednesday");
        const data5 = await getslotcode("Thursday");
        const data6 = await getslotcode("Friday");
        const data7 = await getslotcode("Saturday");
        setSlotData1(data1);
        setSlotData2(data2);
        setSlotData3(data3);
        setSlotData4(data4);
        setSlotData5(data5);
        setSlotData6(data6);
        setSlotData7(data7);
        setSlotData(
          slotData1,
          slotData2,
          slotData3,
          slotData4,
          slotData5,
          slotData6,
          slotData7
        );
      } catch (error) {
        console.error("Error fetching slot data:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const getter = async (data1, data2) => {
    let q;
    if (data1 === "Morning") {
      q = "slot001";
    } else if (data1 === "Afternoon") {
      q = "slot002";
    } else {
      q = "slot003";
    }

    let query = `select cl.class_name from current_slots c, classes cl where c.class_id= cl.class_id and c.slot_id = '${q}' and c.weekday ='${data2}'`;
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
      if (!response.ok) {
        console.log("Error:", response.status);
        return;
      }

      return responseData.sol;
    } catch (error) {
      console.error("Error ", error);
    }
  };
  const handlelogout = () => {
    navigate("/");
  };
  const getslotcode = async (data) => {
    try {
      const slotData = await Promise.all(
        slotlist.map(async (item, index) => {
          let l = await getter(item, data);
          return (
            <div className="flex flex-row" key={index}>
              <div className="mr-3 font-bold">{item}:</div>
              <div>
                {l.map((subItem, subIndex) => (
                  <React.Fragment key={subIndex}>
                    <div>{subItem}</div>
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })
      );

      return slotData;
    } catch (error) {}
  };

  return (
    <div className="font-body overflow-hidden h-screen bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 w-screen">
      <div className="overflow-hidden flex flex-row justify-between h-screen">
        <div className="overflow-hidden pb-4 px-4 bg-neutral-400 bg-opacity-60 w-80 h-screen flex flex-col justify-between">
          <ul className="text-lg">
            <li
              onClick={() => {
                navigate("/admin/members");
              }}
              className="underline my-9 hover:border-2 hover:border-black p-2 hover:shadow-md hover:shadow-black hover:bg-slate-950 hover:text-white hover:cursor-pointer"
            >
              View Members
            </li>

            <li
              onClick={() => {
                navigate("/admin/createplan");
              }}
              className="underline my-9 hover:border-2 hover:border-black p-2 hover:shadow-md hover:shadow-black hover:bg-slate-950 hover:text-white hover:cursor-pointer"
            >
              Create Plans
            </li>
            <li
              onClick={() => {
                navigate("/admin/createclass");
              }}
              className="underline my-9 hover:border-2 hover:border-black p-2 hover:shadow-md hover:shadow-black hover:bg-slate-950 hover:text-white hover:cursor-pointer"
            >
              Create New Class
            </li>
            <li
              onClick={() => {
                navigate("/admin/classes");
              }}
              className="underline my-9 hover:border-2 hover:border-black p-2 hover:shadow-md hover:shadow-black hover:bg-slate-950 hover:text-white hover:cursor-pointer"
            >
              View Current classes
            </li>
            <li
              onClick={() => {
                navigate("/admin/facilities");
              }}
              className="underline my-9 hover:border-2 hover:border-black p-2 hover:shadow-md hover:shadow-black hover:bg-slate-950 hover:text-white hover:cursor-pointer"
            >
              View Facilities
            </li>

            <li
              onClick={() => {
                navigate("/admin/employees");
              }}
              className="underline my-9 hover:border-2 hover:border-black p-2 hover:shadow-md hover:shadow-black hover:bg-slate-950 hover:text-white hover:cursor-pointer"
            >
              View Employees
            </li>
            <li
              onClick={() => {
                navigate("/admin/records");
              }}
              className="underline my-9 hover:border-2 hover:border-black p-2 hover:shadow-md hover:shadow-black hover:bg-slate-950 hover:text-white hover:cursor-pointer"
            >
              Update records
            </li>
            <li
              onClick={() => {
                navigate("/admin/createemp");
              }}
              className="underline my-9 hover:border-2 hover:border-black p-2 hover:shadow-md hover:shadow-black hover:bg-slate-950 hover:text-white hover:cursor-pointer"
            >
              Create Employees
            </li>
          </ul>
          <div
            onClick={handlelogout}
            className=" border-2 border-black text-white bg-red-700 hover:bg-red-800 rounded-md hover:shadow-black hover:shadow-md hover:border-2 hover:border-black p-2 h-10 mb-5 flex justify-center items-center hover:cursor-pointer"
          >
            <button className="align-middle">LOG OUT</button>
          </div>
        </div>
        <div className="overflow-hidden relative bg-slate-900 bg-opacity-65 w-screen">
          <div className="h-screen overflow-y-scroll relative ml-12 text-white">
            <div className="flex flex-row relative p-2 m-4 ">
              <p className=" mx-auto text-4xl">WEEKLY-SLOT</p>
            </div>
            {[
              slotData1,
              slotData2,
              slotData3,
              slotData4,
              slotData5,
              slotData6,
              slotData7,
            ].map((slot, dayIndex) => (
              <div
                key={`day${dayIndex}`}
                className="flex flex-row relative p-2 m-4 border-2 border-white"
              >
                <p className="mt-14 m-auto text-4xl">{days[dayIndex]}:</p>
                {slot.map((item, index) => (
                  <div
                    key={`day${dayIndex}_slot${index}`}
                    className="flex flex-row relative p-3 m-1 border-2 border-black hover:shadow-black hover:shadow-lg hover:cursor-pointer"
                    onClick={() => {
                      navigate(`./assign/${index}-${days[dayIndex]}`);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
