import React, { Component, useEffect, useState } from "react";

const AssignSlots = ({ data }) => {
  const [classes, setclasses] = useState([]);
  const [trainers, settrainers] = useState([]);
  const [allclasses, setallclasses] = useState([]);

  const [selecteddealloc, setselecteddealloc] = useState("");
  const [selectedalloc, setselectedalloc] = useState("");
  const [selectedtclass, setselectedtclass] = useState("");
  const [selecteddetclass, setselecteddetclass] = useState("");
  const [maxval, setmaxval] = useState(0);
  const [empid, setempid] = useState("");
  const [deempid, setdeempid] = useState("");

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");

  const resetall = () => {
    setselecteddealloc("");
    setselectedalloc("");
    setselectedtclass("");
    setselecteddetclass("");
    setmaxval("");
    setempid("");
    setdeempid("");
  };

  const showsuccess1 = () => {
    setError1("success");
    setError2("");
    setError3("");
    setError4("");
    resetall();
    handleAddition();
    handleAddition2();
    handleAddition3();
  };
  const showsuccess2 = () => {
    setError2("success");
    setError1("");
    setError3("");
    setError4("");
    handleAddition();
    handleAddition2();
    resetall();
    handleAddition3();
  };
  const showsuccess3 = () => {
    setError3("success");
    setError2("");
    setError1("");
    setError4("");
    resetall();
    handleAddition();
    handleAddition2();
    handleAddition3();
  };
  const showsuccess4 = () => {
    setError4("success");
    setError2("");
    setError1("");
    setError3("");
    resetall();
    handleAddition();
    handleAddition2();
    handleAddition3();
  };

  const gettrainers = (list) => {
    const newl = [];
    list.forEach((element) => {
      if (element[2] === selecteddetclass) {
        newl.push(element);
      }
    });
    return newl;
  };

  const getslot = (a) => {
    if (a === "0") {
      return "Morning";
    } else if (a === "1") {
      return "Afternoon";
    } else if (a === "2") {
      return "Evening";
    }
  };

  const getslotid = (a) => {
    if (a === "0") {
      return "slot001";
    } else if (a === "1") {
      return "slot002";
    } else if (a === "2") {
      return "slot003";
    }
  };

  const handleAddition = async () => {
    // SELECT c.class_name, c.class_id, m.max_alloc FROM classes c, current_slots s, max_slots m WHERE c.class_id = s.class_id AND m.class_id = c.class_id AND m.slot_id = s.slot_id AND s.weekday = 'Sunday' AND s.slot_id = 'slot002';

    let query = `select c.class_name, c.class_id, m.max_allowed from classes c, current_slots s, max_slots m where c.class_id = s.class_id and m.class_id = c.class_id and m.slot_id = s.slot_id and s.weekday = '${data.slice(
      2,
      11
    )}' and s.slot_id = '${getslotid(data[0])}'  `;
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

      setclasses(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition2 = async (c) => {
    let query = `select e.first_name, e.last_name, t.class_id, e.emp_id from employee e, trainers t where e.emp_id = t.emp_id and t.weekday = '${data.slice(
      2,
      11
    )}' and t.slot_id = '${getslotid(data[0])}'  `;
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
      console.log(data.sol);
      settrainers(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition3 = async () => {
    let query = `select c.class_name, c.class_id from classes c where c.class_id not in (select c2.class_id from classes c2, current_slots s where c2.class_id = s.class_id and s.weekday = '${data.slice(
      2,
      11
    )}' and s.slot_id = '${getslotid(data[0])}')  `;
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

      setallclasses(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handledealloc = (e) => {
    const option = e.target.value;
    console.log(option);
    setselecteddealloc(option);
  };

  const handlealloc = (e) => {
    const option = e.target.value;
    console.log(option);
    setselectedalloc(option);
  };

  const handlemax = (e) => {
    const option = e.target.value;
    console.log(option);
    setmaxval(option);
  };

  const handleempid = (e) => {
    const option = e.target.value;
    console.log(option);
    setempid(option);
  };

  const handledeempid = (e) => {
    const option = e.target.value;
    console.log(option);
    setdeempid(option);
  };

  const handletclass = (e) => {
    const option = e.target.value;
    console.log(option);
    setselectedtclass(option);
  };

  const handledetclass = (e) => {
    const option = e.target.value;
    console.log(option);
    setselecteddetclass(option);
  };

  const handledeallocsubmit = async (a) => {
    if (a.length === 0) {
      setError1("nothing");
      return;
    }
    let query = `delete from current_slots s where s.weekday = '${data.slice(
      2,
      11
    )}' and s.slot_id = '${getslotid(data[0])}' and s.class_id = '${a}'`;
    await handleAddition4(query);
  };

  const handleallocsubmit = async (a, b) => {
    let query = `insert into current_slots VALUES('${a}', '${getslotid(
      data[0]
    )}', '${data.slice(2, 11)}', 0)`;
    console.log(query);
    await handleAddition5(query);
  };

  const handletclasssubmit = async (a, b) => {
    let query = `insert into trainers VALUES('${b}', '${a}', '${getslotid(
      data[0]
    )}', '${data.slice(2, 11)}')`;

    await handleAddition6(query);
  };

  const handledetclasssubmit = async (a, b) => {
    if (a.length === 0 || b.length === 0) {
      setError4("nothing");
      return;
    }
    let query = `delete from trainers t where class_id = '${a}' and emp_id = '${b}' and weekday = '${data.slice(
      2,
      11
    )}' and slot_id = '${getslotid(data[0])}'`;

    await handleAddition7(query);
  };

  const handleAddition4 = async (query) => {
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
        showsuccess1();
      }

      if (response.status === 500) {
        setError1(responseData.error);
        console.log(responseData.error);
      }
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
        showsuccess2();
      }

      if (response.status === 500) {
        setError2(responseData.error);
        console.log(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  const handleAddition6 = async (query) => {
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
        showsuccess3();
        console.log("ok");
      }

      if (response.status === 500) {
        setError3(responseData.error);
        console.log(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition7 = async (query) => {
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
        showsuccess4();
      }

      if (response.status === 500) {
        setError4(responseData.error);
        console.log(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    handleAddition();
    handleAddition2();
    handleAddition3();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 bg-opacity-30 h-screen w-screen flex flex-row justify-center overflow-hidden">
      <div className="bg-slate-300 bg-opacity-65 flex flex-row mx-56 p-5 h-screen justify-between w-fit">
        <div className="bg-slate-900 bg-opacity-85 p-5 h-fit w-max rounded-3xl flex flex-row">
          <div className=" p-10 flex flex-col justify-evenly rounded-l-3xl">
            <div className="mb-5">
              <p className="text-white text-8xl">{data.slice(2, 11)}</p>
              <p className="text-white text-right mt-4 text-2xl">
                {getslot(data[0])}
              </p>
            </div>
            <div className="bg-slate-100 bg-opacity-65 rounded-2xl px-5 pb-5">
              {classes.map((item, index) => {
                return (
                  <div key={index}>
                    <br />
                    <p>Class-Name: {item[0]}</p>
                    <p>Max Seats: {item[2]}</p>
                    <div className="flex flex-row">
                      <p>Trainers: </p>
                      <div className="ml-2">
                        {trainers.map((inneritem, index) => {
                          return (
                            <p key={index}>
                              {inneritem[2] === item[1]
                                ? inneritem[0] + " " + inneritem[1]
                                : ""}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" p-5 h-fit w-max rounded-r-3xl">
            <div className="bg-slate-100 bg-opacity-65 p-2 rounded-2xl flex flex-col items-center">
              <div className="flex flex-row justify-center align-middle">
                <label className="mr-5 self-center" htmlFor="option2">
                  Deallocate a class:
                </label>
                <br />
                <select
                  id="option2"
                  className="p-1 pl-3 pr-3 rounded-lg text-black border-2 border-black"
                  onChange={handledealloc}
                  value={selecteddealloc}
                >
                  <option value="">Select</option>
                  {classes.map((plan, index) => (
                    <option key={index} value={plan[1]}>
                      {plan[0]}
                    </option>
                  ))}
                </select>
              </div>
              <div
                onClick={() => {
                  handledeallocsubmit(selecteddealloc);
                }}
                className="bg-green-500 bg-opacity-75 shadow-black shadow-sm w-20 h-8 text-center mt-4 rounded-xl p-1 hover:bg-green-700 hover:text-white hover:shadow-md hover:shadow-black hover:cursor-pointer"
              >
                Confirm
              </div>
              <div
                className={
                  error1 != "success"
                    ? `text-red-600 text-center mt-3`
                    : `text-green-800 text-center mt-3`
                }
              >
                {error1.slice(0, 9) === "ORA-04091"
                  ? "Employee is already a Head Coach of a Class"
                  : error1.slice(0, 9) === "ORA-00001"
                  ? "Employee is already Assigned/Alloted"
                  : error1.slice(0, 9) === "nothing"
                  ? "Enter Some value"
                  : error1}
              </div>
            </div>

            <div className="bg-slate-100 bg-opacity-65 p-2 rounded-2xl flex flex-col items-center mt-5">
              <div className="flex flex-row justify-center align-middle">
                <label className="mr-5 self-center" htmlFor="option2">
                  Class to Allocate
                </label>
                <br />
                <select
                  id="option2"
                  className="p-1 pl-3 pr-3 rounded-lg text-black border-2 border-black"
                  onChange={handlealloc}
                  value={selectedalloc}
                >
                  <option value="">Select</option>
                  {allclasses.map((plan, index) => (
                    <option key={index} value={plan[1]}>
                      {plan[0]}
                    </option>
                  ))}
                </select>
              </div>

              <div
                onClick={() => handleallocsubmit(selectedalloc, maxval)}
                className="bg-green-500 bg-opacity-75 shadow-black shadow-sm w-20 h-8 text-center mt-4 rounded-xl p-1 hover:bg-green-700 hover:text-white hover:shadow-md hover:shadow-black hover:cursor-pointer"
              >
                Confirm
              </div>
              <div
                className={
                  error2 != "success"
                    ? `text-red-600 text-center mt-3`
                    : `text-green-800 text-center mt-3`
                }
              >
                {error2.slice(0, 9) === "ORA-04091"
                  ? ""
                  : error2.slice(0, 9) === "ORA-20001"
                  ? "Class is already present today"
                  : error2 === "success"
                  ? "success"
                  : error2.length === 0
                  ? ""
                  : "Enter value"}
              </div>
            </div>

            <div className="bg-slate-100 bg-opacity-65 p-2 rounded-2xl flex flex-col items-center mt-5">
              <div className="flex flex-row justify-center align-middle">
                <label className="mr-5 self-center" htmlFor="option2">
                  Allocate Trainer Class
                </label>
                <br />
                <select
                  id="option2"
                  className="p-1 pl-3 pr-3 rounded-lg text-black border-2 border-black"
                  onChange={handletclass}
                  value={selectedtclass}
                >
                  <option value="">Select</option>
                  {classes.map((plan, index) => (
                    <option key={index} value={plan[1]}>
                      {plan[0]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row justify-center align-middle mt-3">
                <label className="mr-5">Trainer ID: </label>
                <input
                  className="max-h-8 p-2 rounded-lg text-black border-2 border-black self-center"
                  type="text"
                  onChange={handleempid}
                  value={empid}
                ></input>
              </div>
              <div
                onClick={() => handletclasssubmit(selectedtclass, empid)}
                className="bg-green-500 bg-opacity-75 shadow-black shadow-sm w-20 h-8 text-center mt-4 rounded-xl p-1 hover:bg-green-700 hover:text-white hover:shadow-md hover:shadow-black hover:cursor-pointer"
              >
                Confirm
              </div>
              <div
                className={
                  error3 != "success"
                    ? `text-red-600 text-center mt-3`
                    : `text-green-800 text-center mt-3`
                }
              >
                {error3.slice(0, 9) === "ORA-04091"
                  ? "Employee is already a Head Coach of a Class"
                  : error3.slice(0, 9) === "ORA-20002"
                  ? "Employee is already training some class"
                  : error3.slice(0, 9) === "ORA-20001"
                  ? "Is a head coach for other class"
                  : error3.slice(0, 9) === "ORA-01400"
                  ? "Enter Value"
                  : error3}
              </div>
            </div>

            <div className="bg-slate-100 bg-opacity-65 p-2 rounded-2xl flex flex-col items-center mt-5">
              <div className="flex flex-row justify-center align-middle">
                <label className="mr-5 self-center" htmlFor="option2">
                  Deallocate Trainer Class
                </label>
                <br />
                <select
                  id="option2"
                  className="p-1 pl-3 pr-3 rounded-lg text-black border-2 border-black"
                  onChange={handledetclass}
                  value={selecteddetclass}
                >
                  <option value="">Select</option>
                  {classes.map((plan, index) => (
                    <option key={index} value={plan[1]}>
                      {plan[0]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row justify-center align-middle mt-3">
                <label className="mr-5">Trainer ID: </label>

                <br />
                <select
                  id="option2"
                  className="p-1 pl-3 pr-3 rounded-lg text-black border-2 border-black"
                  onChange={handledeempid}
                  value={deempid}
                >
                  <option value="">Select</option>
                  {gettrainers(trainers).map((val, index) => {
                    return (
                      <option key={index} value={val[3]}>
                        {val[0] + " " + val[1]}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                onClick={() => handledetclasssubmit(selecteddetclass, deempid)}
                className="bg-green-500 bg-opacity-75 shadow-black shadow-sm w-20 h-8 text-center mt-4 rounded-xl p-1 hover:bg-green-700 hover:text-white hover:shadow-md hover:shadow-black hover:cursor-pointer"
              >
                Confirm
              </div>
              <div
                className={
                  error4 != "success"
                    ? `text-red-600 text-center mt-3`
                    : `text-green-800 text-center mt-3`
                }
              >
                {error4.slice(0, 9) === "ORA-04091"
                  ? "Employee is already a Head Coach of a Class"
                  : error4.slice(0, 9) === "ORA-00001"
                  ? "Employee is already Assigned/Alloted"
                  : error4.slice(0, 9) === "nothing"
                  ? "Enter Value"
                  : error4}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignSlots;
