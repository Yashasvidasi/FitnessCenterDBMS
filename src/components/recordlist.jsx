import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecordList = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  const [error, seterror] = useState("");

  const [recid, setrecid] = useState("");
  const [recname, setrecname] = useState("");
  const [cusid, setcusid] = useState("");

  const handleAddition = async () => {
    let query = "select * from records";
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

  const handleAdditionup = async (query) => {
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
      console.log("here");
      if (responseData.sol === "allgood") {
        seterror("success");
        handleAddition();
      }
      console.log(responseData.sol);

      if (response.status === 500) {
        seterror(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handlesubmit = async (a, b, c) => {
    if (a.length === 0 || b.length === 0 || c.length === 0) {
      seterror("ORA-01401");
      return;
    }
    let query = `insert into records values('${a}','${b}','${c}')`;
    await handleAdditionup(query);
    setTimeout(() => {
      seterror("");
    }, 1900);
  };

  useEffect(() => {
    handleAddition();
  }, []);
  return (
    <div className="bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 bg-opacity-70 w-screen h-screen p-8 overflow-hidden font-body  justify-center align-middle">
      <div className="flex flex-row overflow-hidden justify-evenly">
        <div>
          <div className="text-black text-4xl font-semibold text-center mt-8 m-2 ">
            RECORDS
          </div>
          <div
            style={{ height: "30%" }}
            className="bg-slate-700 bg-opacity-80 border-4 mt-10 border-black w-fit mx-auto overflow-auto"
          >
            <table className="border-2 border-black text-white">
              <thead className="border-separate p-16 border-2 border-black ">
                <tr>
                  <th className="p-4 border-2 border-black">Record ID</th>
                  <th className="p-4 border-2 border-black">Record</th>
                  <th className="p-4 border-2 border-black">Customer ID</th>
                </tr>
              </thead>
              <tbody className="">
                {members.map((member, index) => (
                  <tr
                    key={index}
                    className="hover:border-2 hover:border-black hover:cursor-pointer hover:shadow-md hover:shadow-black"
                    onClick={() => {
                      navigate(`/admin/members/${member[2]}`);
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
        <div>
          <div className="text-black text-4xl font-semibold text-center mt-8 m-2 ">
            CREATE RECORD
          </div>
          <div className="bg-slate-700 bg-opacity-80 border-4 mt-10 border-black w-fit mx-auto overflow-auto p-12 text-white">
            <div className="mb-4 mx-auto">
              <label>Enter Record ID: </label>
              <br />
              <input
                placeholder="#PLAN001"
                className="p-1 pl-3 rounded-lg text-black border-2 border-black"
                onChange={(e) => setrecid(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="mb-4 mx-auto">
              <label>Enter Descriptiom: </label>
              <br />
              <input
                placeholder="Name.."
                className="p-1 pl-3 rounded-lg text-black border-2 border-black"
                onChange={(e) => setrecname(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className="mb-4 mx-auto">
              <label>Enter Customer ID: </label>
              <br />
              <input
                placeholder="#1000"
                className="p-1 pl-3 rounded-lg text-black border-2 border-black"
                onChange={(e) => setcusid(e.target.value)}
                type="text"
              ></input>
            </div>

            <div
              onClick={() => handlesubmit(recid, recname, cusid)}
              className="border-4 border-black bg-slate-900 shadow-md shadow-black hover:text-black hover:bg-slate-200 hover:cursor-pointer hover:shadow-xl hover:shadow-black mx-auto w-20 text-center mt-12"
            >
              Confirm
            </div>
            <div className="mx-auto text-center">
              {error ===
              "ORA-00001: unique constraint (C##NEW_KANNA.SYS_C008319) violated" ? (
                <div className="text-red-500 mt-4 mx-auto">
                  ID already exists
                </div>
              ) : error ===
                'ORA-01400: cannot insert NULL into ("C##NEW_KANNA"."MEMBERSHIP"."PLAN_ID")' ? (
                <div className="text-red-500 mt-4 mx-auto">Fill the Values</div>
              ) : error === "success" ? (
                <div className="text-lime-500 mt-4 mx-auto">Success</div>
              ) : error === "ORA-01401" ? (
                <div className="text-red-500 mt-4 mx-auto">Fill the values</div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordList;
