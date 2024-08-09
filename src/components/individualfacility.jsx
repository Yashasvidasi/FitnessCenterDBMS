import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IndividualFacility = ({ data }) => {
  const [List, setList] = useState([]);
  const [List2, setList2] = useState([]);
  const [facname, setfacname] = useState("");
  const navigate = useNavigate();

  const handleAddition = async () => {
    let queryString = `select c.customer_id, c.first_name, c.last_name from customers c, uses u, facilities f where u.fac_id = f.fac_id and c.customer_id = u.customer_id and f.fac_id = '${data}'`;
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
      console.log(responseData.sol);
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
    let queryString = `select e.emp_id, e.first_name, e.last_name from facilities f, employee e, maintains m where e.emp_id = m.emp_id and m.fac_id = f.fac_id and f.fac_id = '${data}'`;
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
      console.log(responseData.sol);
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      setList2(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition3 = async () => {
    let queryString = `select fac_name from facilities where fac_id = '${data}'`;
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
      console.log(responseData.sol);
      if (!response.ok) {
        // Check for any error status, not just 500
        console.log("Error:", response.status);
        return;
      }
      setfacname(responseData.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    handleAddition();
    handleAddition2();
    handleAddition3();
  }, [data]);

  return (
    <div className="overflow-y-auto overflow-x-hidden bg-gradient-to-br from-indigo-800/85 to-cyan-400/75  bg-opacity-8  h-screen w-screen px-12">
      <p className="text-center font-semibold text-black text-4xl pt-8">
        {facname}
      </p>
      <div className="rounded-xl bg-slate-100 bg-opacity-65 mx-auto flex flex-row w-fit p-12 justify-evenly mt-8">
        <div className="mx-6">
          <div className="text-center text-bold text-lg mb-3">
            Customers Using this Facility:
          </div>
          <div className="overflow-auto max-h-fit border-2 border-black rounded-2xl p-2">
            <table className="">
              <thead className="border-separate p-16">
                <tr>
                  <th className="p-4 border-b-2 border-black">Customer_id </th>
                  <th className="p-4 border-b-2 border-black">
                    Customer Name{" "}
                  </th>
                </tr>
              </thead>

              <tbody>
                {List.map((item, index) => (
                  <tr
                    className="hover:border-2 hover:border-black hover:cursor-pointer hover:shadow-md hover:shadow-black"
                    key={index}
                    onClick={() => navigate(`/admin/members/${item[0]}`)}
                  >
                    <td className="px-8 py-2">{item[0]}</td>
                    <td className="px-8 ">{item[1] + " " + item[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-6">
          <div className="text-center text-bold text-lg mb-3">
            Employees Maintaining this Facility:
          </div>
          <div className="overflow-auto max-h-fit border-2 border-black rounded-2xl p-2">
            <table className=" ">
              <thead className="">
                <tr>
                  <th className="p-4 border-b-2 border-black">Employee ID </th>
                  <th className="p-4 border-b-2 border-black">
                    Employee Name{" "}
                  </th>
                </tr>
              </thead>

              <tbody>
                {List2.map((item, index) => (
                  <tr
                    className="hover:border-2 hover:border-black hover:cursor-pointer hover:shadow-md hover:shadow-black"
                    key={index}
                    onClick={() => navigate(`/admin/employees/${item[0]}`)}
                  >
                    <td className="px-8 py-2">{item[0]}</td>
                    <td className="px-8 ">{item[1] + " " + item[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualFacility;
