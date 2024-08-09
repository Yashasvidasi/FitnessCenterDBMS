import React, { useEffect, useState } from "react";

const CreateClass = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedfac, setSelectedfac] = useState([]);
  const [selectedid, setselectedid] = useState("");
  const [selectedname, setselectedname] = useState("");
  const [selectedhead, setselectedhead] = useState(0);
  const [facs, setfacs] = useState([]);
  const [classes, setclasses] = useState([]);
  const [error, setError] = useState("");
  const [errord, setErrord] = useState("");
  const [success, setsuccess] = useState("");

  const [morning, setmorning] = useState("");
  const [evening, setevening] = useState("");
  const [afternoon, setafternoon] = useState("");
  const [count, setcount] = useState([]);

  const [selecteddel, setselecteddel] = useState("");

  const showsuccess = () => {
    setError("success");
    setTimeout(function () {
      window.location.href = "/admin";
    }, 2000);
  };

  const showsuccessd = () => {
    setErrord("success");
    setTimeout(function () {
      window.location.href = "/admin";
    }, 2000);
  };

  const getfac = (f) => {
    let intValue = parseInt(f, 10);
    intValue = intValue + 1;
    console.log(intValue.toString());
    if (f >= 9) {
      return "FAC0" + intValue.toString();
    } else {
      return "FAC00" + intValue.toString();
    }
  };
  const plans = [
    "1-Month",
    "3-Months",
    "4-Months",
    "6-Months",
    "1-Year",
    "2-Year",
  ];

  const handlefacChange = (e) => {
    const option = e.target.value;
    console.log(">>>>", option);
    setSelectedfac(option);
  };

  const handleidchange = (e) => {
    const option = e.target.value;
    setselectedid(option);
  };

  const handlenameChange = (e) => {
    const option = e.target.value;
    setselectedname(option);
  };

  const handledelChange = (e) => {
    const option = e.target.value;
    setselecteddel(option);
  };

  const handlemorning = (e) => {
    const option = e.target.value;
    setmorning(option);
  };
  const handleevening = (e) => {
    const option = e.target.value;
    setevening(option);
  };
  const handleafternoon = (e) => {
    const option = e.target.value;
    setafternoon(option);
  };
  const handleheadchange = (e) => {
    const option = e.target.value;
    setselectedhead(option);
  };

  const handleAdditioncount = async () => {
    let query = `select count(*) from classes`;
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

      setcount(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const formatCustomerNumbers = (numbers) => {
    return numbers.map((number) => {
      // Convert non-numeric values to numbers
      const numericNumber = isNaN(number) ? Number(number) : number;
      const paddedNumber = String(Math.floor(numericNumber)).padStart(3, "0");
      return `CLAS${paddedNumber}`;
    });
  };

  const handlesubmit = async (m, a, e) => {
    try {
      let y = parseInt(count[0]) + 1;
      console.log(">>?>>", y);
      let s = formatCustomerNumbers([y]);
      console.log(">S>>>", s);
      let query = `insert into classes values('${
        s[0]
      }','${selectedname}', '${getfac(selectedfac)}', '${selectedhead}')`;
      let q2 = `insert into max_slots values('${s[0]}','slot001',${m})`;
      let q3 = `insert into max_slots values('${s[0]}','slot002',${a})`;
      let q4 = `insert into max_slots values('${s[0]}','slot003',${e})`;
      setError("");
      console.log(query);
      await handleAddition(query);
      await handleAddition(q2);
      await handleAddition(q3);
      await handleAddition(q4);
    } catch (error) {
      console.error("Error ", error);
      setError("An error occurred while submitting the form.");
    }
  };

  const handledel = async (q) => {
    let query = `delete from classes where class_id = '${q}'`;
    if (q.length === 0) {
      setErrord("please000");
      return;
    }
    await handleAdditiondel(query);
  };

  const handleAdditiondel = async (query) => {
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
        showsuccessd();
      }

      if (response.status === 500) {
        setErrord(responseData.error);
        console.log(responseData.error.slice(0, 9));
      }
    } catch (error) {
      console.error("Error ", error);
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
        setError(responseData.error);
        console.log(responseData.error.slice(0, 9));
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    handleAddition2();
    handleAddition3();
    handleAdditioncount();
  }, []);

  const handleAddition3 = async () => {
    let query = "select class_id, class_name from classes";
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
      setclasses(responseData.sol);
      if (responseData.sol === "allgood") {
        showsuccess();
      }

      if (response.status === 500) {
        setError(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition2 = async () => {
    let query = "select fac_name from facilities";
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
      setfacs(responseData.sol);
      if (responseData.sol === "allgood") {
        showsuccess();
      }

      if (response.status === 500) {
        setError(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div className="overflow-hidden h-screen bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 w-screen p-12 flex flex-col align-middle justify-center">
      <div
        style={{ width: "70%" }}
        className="bg-slate-700 border-4 bg-opacity-65 border-black  mx-auto p-12 text-white align-middle flex flex-row justify-cente"
      >
        <div className="text-white font-semibold text-5xl w-96 text-right mr-6 self-center mb-24">
          Create New Class
        </div>
        <div className="mx-7">
          <div className="mb-4 mx-auto">
            <label>Enter new Class Name: </label>
            <br />
            <input
              placeholder="Name.."
              className="p-1 pl-3 rounded-lg text-black border-2 border-black"
              onChange={handlenameChange}
              type="text"
            ></input>
          </div>
          <div className="mb-4 mx-auto">
            <label htmlFor="option2">Choose a Facility:</label>
            <br />
            <select
              id="option2"
              className="p-1 pl-3 pr-3 rounded-lg text-black border-2 border-black"
              onChange={handlefacChange}
              value={selectedfac}
            >
              <option value="0">Select</option>
              {facs.map((plan, index) => (
                <option key={index} value={index}>
                  {plan}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 mx-auto">
            <label>Appoint a head Coach ID: </label>
            <br />
            <input
              placeholder="#EMP001"
              className="p-1 pl-3 rounded-lg text-black border-2 border-black"
              onChange={handleheadchange}
              type="text"
            ></input>
          </div>
        </div>
        <div className="flex flex-col justify-center align-middle">
          <div className="mb-4 mx-auto w-52">
            <label>Max Strength for Morning: </label>
            <br />
            <input
              placeholder="0"
              className="p-1 pl-3 rounded-lg text-black border-2 border-black"
              onChange={handlemorning}
              type="number"
            ></input>
          </div>
          <div className="mb-4 mx-auto">
            <label>Max Strength for Afternoon: </label>
            <br />
            <input
              placeholder="0"
              className="p-1 pl-3 rounded-lg text-black border-2 border-black"
              onChange={handleafternoon}
              type="number"
            ></input>
          </div>
          <div className="mb-4 mx-auto">
            <label>Max Strength for Evening: </label>
            <br />
            <input
              placeholder="0"
              className="p-1 pl-3 rounded-lg text-black border-2 border-black"
              onChange={handleevening}
              type="number"
            ></input>
          </div>
          <div
            onClick={() => handlesubmit(morning, afternoon, evening)}
            className="border-4 border-black bg-slate-900 shadow-md shadow-black hover:text-black hover:bg-slate-200 hover:cursor-pointer hover:shadow-xl hover:shadow-black mx-auto w-20 text-center mt-7"
          >
            Confirm
          </div>

          {error.slice(0, 9) === "ORA-00001" ? (
            <div className="text-red-500 mt-4 mx-auto">ID already exists</div>
          ) : error.slice(0, 9) === `ORA-20002` ? (
            <div className="text-red-500 mt-4 mx-auto text-center">
              Employee cannot be the head coach for any class other than the
              classes they are trainers for.
            </div>
          ) : error.slice(0, 9) === `ORA-02291` ? (
            <div className="text-red-500 mt-4 mx-auto text-center">
              Employee is already a head coach for a Class
            </div>
          ) : error === "success" ? (
            <div className="text-lime-500 mt-4 self-center">Success</div>
          ) : error.length === 0 ? (
            <div></div>
          ) : (
            <div className="text-red-500 mt-4 mx-auto text-center">
              Enter the values
            </div>
          )}
        </div>
      </div>
      <div
        style={{ width: "70%" }}
        className="bg-slate-700 border-4 bg-opacity-65 border-black mt-3  mx-auto p-8 h-fit text-white align-middle flex flex-row justify-evenly"
      >
        <div className="text-white font-semibold text-5xl w-fit text-right self-center">
          Delete Class
        </div>
        <div className="flex flex-col justify-center align-middle">
          <div className="mb-4 mx-auto ">
            <label className="mb-3" htmlFor="option2">
              Choose Class:
            </label>
            <br />
            <select
              id="option2"
              className="p-1 pl-3 pr-3 rounded-lg text-black border-2 border-black"
              onChange={handledelChange}
              value={"ok"}
            >
              <option value="">Select</option>
              {classes.map((plan, index) => (
                <option key={index} value={plan[0]}>
                  {plan[1]}
                </option>
              ))}
            </select>
          </div>
          <div
            onClick={() => handledel(selecteddel)}
            className="border-4 border-black bg-slate-900 shadow-md shadow-black hover:text-black hover:bg-slate-200 hover:cursor-pointer hover:shadow-xl hover:shadow-black mx-auto w-20 text-center"
          >
            Confirm
          </div>
          <div className="mx-auto mt-4">
            {errord.slice(0, 9) === "ORA-00001" ? (
              <div className="text-red-500 mt-4 mx-auto">ID already exists</div>
            ) : errord.slice(0, 9) === `ORA-20002` ? (
              <div className="text-red-500 mt-4 mx-auto text-center">
                Employee cannot be the head coach for any class other than the
                classes they are trainers for.
              </div>
            ) : errord.slice(0, 9) === `ORA-02291` ? (
              <div className="text-red-500 mt-4 mx-auto text-center">
                Employee is already a head coach for a Class
              </div>
            ) : errord === "success" ? (
              <div className="text-lime-500 mt-4 mx-auto">Success</div>
            ) : errord === "please000" ? (
              <div className="text-red-500 mt-4 mx-auto text-center">
                Enter Something
              </div>
            ) : (
              errord.slice(0, 9)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClass;
