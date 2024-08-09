import React, { useState } from "react";

const CreatePlan = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedid, setselectedid] = useState("");
  const [selectedname, setselectedname] = useState("");
  const [selectedcost, setselectedcost] = useState(0);
  const [data, setdata] = useState("");
  const [error, setError] = useState("");
  const [success, setsuccess] = useState("");

  const showsuccess = () => {
    setError("success");
  };
  const plans = [
    "1-Month",
    "3-Months",
    "4-Months",
    "6-Months",
    "1-Year",
    "2-Year",
  ];

  const getmonth = (term) => {
    switch (term) {
      case "1":
        return 1;
      case "5":
        return 24;
      case "2":
        return 3;
      case "3":
        return 4;
      case "4":
        return 6;
      case "0":
        return 12;
      default:
        return 0; // Handle invalid input
    }
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    console.log(">>>>", option);
    setSelectedOption(option);
  };

  const handleidchange = (e) => {
    const option = e.target.value;
    setselectedid(option);
  };

  const handlenameChange = (e) => {
    const option = e.target.value;
    setselectedname(option);
  };

  const handlecostChange = (e) => {
    const option = e.target.value;
    setselectedcost(option);
  };

  const handlesubmit = async () => {
    try {
      let query = `insert into membership values('${selectedid}','${selectedname}', ${selectedcost}, ${getmonth(
        selectedOption
      )})`;
      console.log(query);
      await handleAddition(query);
    } catch (error) {
      console.error("Error ", error);
      setError("An error occurred while submitting the form.");
    }
  };

  const handleAddition = async (query) => {
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
        console.log(responseData.error);
        setError(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div className="overflow-hidden h-screen bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 w-screen p-12 flex flex-col align-middle justify-center">
      <div className="text-black font-bold text-4xl mx-auto mb-6">
        CREATE PLAN
      </div>
      <div className="bg-slate-700 border-4 bg-opacity-65 border-black  mx-auto p-16 text-white justify-center align-middle flex flex-col w-96">
        <div className="mb-4 mx-auto">
          <label>Enter Plan ID: </label>
          <br />
          <input
            placeholder="#PLAN001"
            className="p-1 pl-3 rounded-lg text-black border-2 border-black"
            onChange={handleidchange}
            type="text"
          ></input>
        </div>
        <div className="mb-4 mx-auto">
          <label>Enter Name: </label>
          <br />
          <input
            placeholder="Name.."
            className="p-1 pl-3 rounded-lg text-black border-2 border-black"
            onChange={handlenameChange}
            type="text"
          ></input>
        </div>
        <div className="mb-4 mx-auto">
          <label>Enter Cost: </label>
          <br />
          <input
            placeholder="#1000"
            className="p-1 pl-3 rounded-lg text-black border-2 border-black"
            onChange={handlecostChange}
            type="number"
          ></input>
        </div>
        <div className="mb-4 ml-6">
          <label htmlFor="option2">Choose a Time Period:</label>
          <br />
          <select
            id="option2"
            className="p-1 pl-3 pr-3 rounded-lg text-black border-2 border-black"
            onChange={handleOptionChange}
            value={selectedOption}
          >
            <option value="">Select</option>
            {plans.map((plan, index) => (
              <option key={index} value={index}>
                {plan}
              </option>
            ))}
          </select>
        </div>
        <div
          onClick={handlesubmit}
          className="border-4 border-black bg-slate-900 shadow-md shadow-black hover:text-black hover:bg-slate-200 hover:cursor-pointer hover:shadow-xl hover:shadow-black mx-auto w-20 text-center mt-12"
        >
          Confirm
        </div>

        {error ===
        "ORA-00001: unique constraint (C##NEW_KANNA.SYS_C008428) violated" ? (
          <div className="text-red-500 mt-4 mx-auto">ID already exists</div>
        ) : error ===
          'ORA-01400: cannot insert NULL into ("C##NEW_KANNA"."MEMBERSHIP"."PLAN_ID")' ? (
          <div className="">Fill the Values</div>
        ) : error === "success" ? (
          <div className="text-lime-500 mt-4 mx-auto">Success</div>
        ) : error ===
          "ORA-00001: unique constraint (C##NEW_KANNA.UNIQUE_CON) violated" ? (
          <div className="text-red-500 mt-4 mx-auto">Name already taken</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CreatePlan;
