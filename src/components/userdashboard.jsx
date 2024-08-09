import React, { Component, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const UserDashBoard = ({ data }) => {
  const [info, setinfo] = useState([]);
  const [classes, setClasses] = useState([]);
  const [facs, setFacs] = useState([]);
  const [allfac, setallfac] = useState([]);
  const [selectfac, setSelectedfac] = useState("");
  const [dfac, setdfac] = useState("");
  const [subclasses, setsubclasses] = useState([]);
  const [slotclasses, setslotclasses] = useState([]);
  const [insertq, setinsertq] = useState("");
  const [insertclass, setinsertclass] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [duepopup, setduepopup] = useState(false);
  const [profilepopup, setprofilepopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDay, setSelectedday] = useState("");
  const [payment, setpayment] = useState(0);
  const [phone, setphone] = useState([]);
  const [selectedph, setselectedph] = useState("");
  const [delpopup, setdelpopup] = useState(false);
  const [recs, setrecs] = useState([]);
  const [errorc, seterrorc] = useState("");

  const [updatedfname, setupdatedfname] = useState("");
  const [updatedmname, setupdatedmname] = useState("");
  const [updatedlname, setupdatedlname] = useState("");
  const [updatedage, setupdatedage] = useState(0);
  const [updatedphnum, setupdatedphnum] = useState("");
  const [updatedpass, setupdatedpass] = useState("");

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");

  const reset = () => {
    setSelectedfac("");
    setdfac("");
    setupdatedage(0);
    setupdatedfname("");
    setupdatedmname("");
    setupdatedlname("");
    setupdatedpass("");
    setupdatedphnum("");
    setpayment(0);
    setError1("");
    setError2("");
    setError3("");
    setError4("");
    setError5("");
    seterrorc("");
  };
  const navigate = useNavigate();
  const showsuccess1 = () => {
    setError1("success");
    setError2("");
    setError3("");
    setError4("");
    reset();
    handleAddition3();
    setTimeout(() => {
      setError1("");
    }, 3000);
  };
  const showsuccess2 = () => {
    setError2("success");
    setError1("");
    setError3("");
    setError4("");
    setError5("");
    handleAddition2();
  };

  const handleAdditionph = async () => {
    let query = `select phone from phnum where customer_id='${data}'`;
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

      setphone(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAdditionrec = async () => {
    let query = `select rec_desc from records where holder_id='${data}'`;
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
      setrecs(data.sol);
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
        setError4("success");
      }
      console.log(responseData.sol);

      if (response.status === 500) {
        setError4(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition = async () => {
    let query = `select c.customer_id, c.first_name, c.middle_name, c.last_name, c.email, c.password, c.age, c.plan_id, c.type_of_pay, c.enroll_date, c.dues, t.first_name, t.last_name from customers c left outer join employee t on (c.trainer_id = t.emp_id) where customer_id='${data}'`;
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

      setinfo(data.sol[0]);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition6 = async () => {
    let query = `select c.class_id, c.class_name, s.slot_id, s.weekday from current_slots s, classes c where c.class_id = s.class_id`;
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
      setsubclasses(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition2 = async () => {
    let query = `select c.class_name, t.slot_id, t.weekday from classes c, takes_slots t where c.class_id = t.class_id and t.customer_id='${data}'`;
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

      setClasses(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition4 = async () => {
    let query = `select f.fac_id, f.fac_name from facilities f where f.fac_name not in (select f.fac_name from facilities f, uses u where u.fac_id = f.fac_id and u.customer_id='${data}')`;
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

      setallfac(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handlefacChange = (e) => {
    const option = e.target.value;
    setSelectedfac(option);
  };

  const handledfacChange = (e) => {
    const option = e.target.value;
    setdfac(option);
  };

  const handleAddition3 = async () => {
    let query = `select f.fac_id, f.fac_name from facilities f, uses u where u.fac_id = f.fac_id and u.customer_id='${data}'`;
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

      setFacs(data.sol);
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
        showsuccess1();
      }

      if (response.status === 500) {
        setError1(responseData.error);

        //console.log(responseData.error);
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
        showsuccess2();
      }

      if (response.status === 500) {
        setError2(responseData.error);
        //console.log(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition8 = async (query) => {
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
        setError3("success");
        handleAddition();
        setTimeout(() => {
          reset();
        }, 2000);
      }

      if (response.status === 500) {
        setError3(responseData.error);
        handleAddition();
        setTimeout(() => {
          reset();
        }, 2000);
      }
    } catch (error) {
      console.error("Error ", error);
    }
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
        setError5("GOODBYE");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }

      if (response.status === 500) {
        console.log(responseData.error);
        setError5(responseData.error);
        setTimeout(() => {
          setError4("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const finalizedelete = async () => {
    let q = `delete from customers where customer_id = '${data}'`;
    await handleAddition9(q);
  };

  const handlepayment = async (money) => {
    if (payment === 0) {
      setError3("lol");
      return;
    }
    let query = `update customers set dues = (select dues from customers where customer_id = '${data}') - ${money} where customer_id = '${data}' `;
    await handleAddition8(query);
  };

  useEffect(() => {
    handleAddition();
    handleAddition4();
    handleAddition3();
    handleAddition2();
    handleAddition6();
    handleAdditionph();
    handleAdditionrec();
  }, []);

  const handleSlotClick = (slot, day) => {
    setShowPopup(true);
    setSelectedSlot(slot);
    console.log(slot);
    setSelectedday(day);
  };

  const handleClosePopup = async () => {
    if (insertclass.length === 0) {
      seterrorc("lol");
      return;
    }
    await handleAddition7(insertq);
    setShowPopup(false);
    setinsertclass("");
    reset();
  };

  const normalclose = async () => {
    setShowPopup(false);
    reset();
  };

  const handlefacclick = async () => {
    let query = `insert into uses values('${data}','${selectfac}')`;
    await handleAddition5(query);
  };

  const handledealloc = async () => {
    let query = `delete from uses where customer_id = '${data}' and fac_id = '${dfac}'`;
    await handleAddition5(query);
  };

  const handleclassclick = (classid, day, slot) => {
    let slotid;
    slot === "Morning"
      ? (slotid = "slot001")
      : slot === "Afternoon"
      ? (slotid = "slot002")
      : (slotid = "slot003");

    if (classid === "none") {
      setinsertq(
        `delete from takes_slots where customer_id = '${data}' and slot_id = '${slotid}' and weekday = '${day}'`
      );
      return;
    }
    let d = new Date();
    let query = `insert into takes_slots values('${data}','${classid}','${slotid}','${day}',TO_DATE('${String(
      d
    ).slice(0, 15)}', 'DY Mon DD YYYY'))`;
    setinsertq(query);
  };

  const handleupdate = async (np, nf, nm, nl, na, nph, dph) => {
    let query1;
    if (nf != "") {
      query1 = `update customers set first_name = '${nf}' where customer_id = '${data}'`;
      await handleAdditionup(query1);
    }
    console.log("????");
    if (np != "") {
      let query2 = `update customers set password = '${np}' where customer_id = '${data}'`;
      await handleAdditionup(query2);
    }
    let query;
    if (nm != "") {
      query = `update customers set middle_name = '${nm}' where customer_id = '${data}'`;
      await handleAdditionup(query);
    }
    if (nl != "") {
      query = `update customers set last_name = '${nl}' where customer_id = '${data}'`;
      await handleAdditionup(query);
    }
    if (na != 0) {
      query = `update customers set age = ${na} where customer_id = '${data}'`;
      await handleAdditionup(query);
    }
    if (nph != "") {
      query = `insert into phnum values('${data}','${nph}')`;
      await handleAdditionup(query);
    }
    if (dph != "") {
      query = `delete from phnum where phone = '${dph}'`;
      await handleAdditionup(query);
    }
    setError4("success");

    setTimeout(() => {
      reset();
      setprofilepopup(false);
      handleAddition();
      handleAdditionph();
    }, 2000);
  };

  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]; // Add your info array here

  const getter = (a, b) => {
    let slot;
    b === "Morning"
      ? (slot = "slot001")
      : b === "Afternoon"
      ? (slot = "slot002")
      : (slot = "slot003");
    let array = [];

    classes.forEach((item) => {
      if (item[2] === a && item[1] === slot) {
        array.push(item[0]);
      }
    });

    return array;
  };

  const getterclass = (a, b) => {
    let slot;
    b === "Morning"
      ? (slot = "slot001")
      : b === "Afternoon"
      ? (slot = "slot002")
      : (slot = "slot003");
    let array = [];

    subclasses.forEach((item) => {
      if (item[3] === a && item[2] === slot) {
        array.push([item[0], item[1]]);
      }
    });
    console.log(subclasses);
    return array;
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden font-body">
      <div className="bg-black text-white py-2 px-6 flex justify-between items-center sticky top-0 z-30">
        <div>
          <img
            className="h-16 w-44 rounded-xl"
            src="https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
        {/* Navigation options */}
        <div className="flex space-x-4 mr-9">
          <div
            className="hover:shadow-black hover:shadow-md p-3 hover:bg-slate-900 rounded-xl hover:cursor-pointer hover:underline"
            onClick={() => setdelpopup(true)}
          >
            Delete My Account
          </div>
          <div
            className="hover:shadow-black hover:shadow-md p-3 hover:bg-gray-900 rounded-xl hover:cursor-pointer hover:underline"
            onClick={() => setprofilepopup(true)}
          >
            Edit Profile
          </div>
          <div
            className="hover:shadow-black hover:shadow-md p-3 hover:bg-gray-900 rounded-xl hover:cursor-pointer hover:underline"
            onClick={() => setduepopup(true)}
          >
            Pay Dues
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        {/* Logout button */}
      </div>
      <div className="flex-1 w-screen  bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 flex flex-col p-10">
        <div className="flex flex-col p-3 bg-slate-300 rounded-xl justify-evenly bg-opacity-60">
          <div className="p-4 m-3 flex flex-row justify-evenly border-t-4 border-b-4 border-black py-10">
            <img
              className="w-72 h-72 rounded-full border-2 border-black shadow-lg my-auto"
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Coach"
            />
            <div className="p-2 m-2 flex flex-col justify-evenly  rounded-2xl px-16 text-black text-2xl font-semibold ">
              <div className="m-2">Your ID: {info[0]}</div>
              <div className="m-2">
                Name: {info[1] + " " + info[2] + " " + info[3]}
              </div>
              <div className="m-2">Age: {info[6]}</div>
              <div className="m-2">Joining Date: {info[9]}</div>
              <div className="flex flex-row m-2">
                <p>Phone Numbers: </p>
                <div className="flex flex-col ml-5">
                  {phone.map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })}
                </div>
              </div>
              <div className="m-2">
                Trainer:{" "}
                {info[11] === null ? "No trainer" : info[11] + " " + info[12]}
              </div>
              <div className="flex flex-row m-2">
                <p>Records: </p>
                <div className="flex flex-col ml-5">
                  {recs.map((item, index) => {
                    return <div key={index}>{item}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row px-8 justify-evenly border-b-4 border-black pb-4">
            <div className="flex flex-col">
              <h2 className="text-black text-4xl font-semibold mt-12 mb-5 mx-auto">
                TAKE CLASSES
              </h2>
              <div
                style={{ height: "500px" }}
                className="w-fit  p-8 m-2 flex flex-col overflow-auto border-2 border-white"
              >
                {week.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-80 h-fit bg-slate-950 bg-opacity-90 p-9 flex flex-col justify-evenly  text-white m-4 rounded-lg"
                      // Set fixed width for the inner card, for example, w-64
                    >
                      <div className="mb-3 text-center font-semibold text-2xl">
                        {item}
                      </div>
                      <div
                        className="my-3 p-2 hover:shadow-sm hover:shadow-black rounded-md hover:border-2 hover:border-white hover:cursor-pointer"
                        onClick={() => handleSlotClick("Morning", item)}
                      >
                        Morning: {`${getter(item, "Morning")}`}
                      </div>
                      <div
                        className="my-3 p-2 hover:shadow-sm hover:shadow-black rounded-md hover:border-2 hover:border-white hover:cursor-pointer"
                        onClick={() => handleSlotClick("Afternoon", item)}
                      >
                        Afternoon: {`${getter(item, "Afternoon")}`}
                      </div>
                      <div
                        className="my-3 p-2 hover:shadow-sm hover:shadow-black rounded-md hover:border-2 hover:border-white hover:cursor-pointer"
                        onClick={() => handleSlotClick("Evening", item)}
                      >
                        Evening: {`${getter(item, "Evening")}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col ">
              <h2 className="text-black text-4xl font-semibold mt-12 mb-5 mx-auto ">
                TAKE FACILITIES
              </h2>
              <div
                style={{ height: "500px" }}
                className="w-fit  p-8 m-2 flex flex-col border-2 border-white"
              >
                <div className="flex flex-row mb-8">
                  <label
                    htmlFor="option"
                    className="text-3xl font-bold mb-9 mr-5"
                  >
                    Current facilities:
                  </label>
                  <div className="flex flex-col ">
                    {facs.map((item, index) => {
                      return (
                        <div className="text-lg mt-1" key={index}>
                          {item[1]}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <label htmlFor="option" className="text-2xl font-bold mr-3">
                      Choose a Facility:
                    </label>
                    <select
                      id="option"
                      className="p-1 rounded-md"
                      onChange={handlefacChange}
                      value={selectfac}
                    >
                      <option value="">Select</option>
                      {allfac.map((plan, index) => (
                        <option key={index} value={plan[0]}>
                          {plan[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handlefacclick}
                    className="bg-green-600 hover:bg-green-800 hover:border-2 mb-10 hover:border-white px-3 py-1 text-white rounded-md text-left w-fit my-5"
                  >
                    Confirm
                  </button>
                </div>

                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <label htmlFor="option" className="text-2xl font-bold mr-3">
                      Remove a Facility:
                    </label>
                    <select
                      id="option"
                      className="p-1 rounded-md"
                      onChange={handledfacChange}
                      value={dfac}
                    >
                      <option value="">Select</option>
                      {facs.map((plan, index) => (
                        <option key={index} value={plan[0]}>
                          {plan[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handledealloc}
                    className="bg-green-600 hover:bg-green-800 hover:border-2 hover:border-white  px-3 py-1 text-white rounded-md text-left w-fit my-5"
                  >
                    Confirm
                  </button>
                </div>
                <div
                  className={
                    error1 != "success"
                      ? `text-red-800 text-center mt-1 text-lg font-semibold`
                      : `text-green-800 text-center mt-1 text-lg font-semibold`
                  }
                >
                  {error1.slice(0, 9) === "ORA-20001"
                    ? "Cannot take more than 5 facilities"
                    : error1.slice(0, 9)}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-black text-center text-sm">
            <p>© 2024 Your Company. All rights reserved.</p>
            <p>Terms of Service | Privacy Policy</p>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white p-8 rounded-lg z-50">
            <h2 className="text-xl font-semibold mb-4">
              Selected Day: {selectedDay}
            </h2>
            <h2 className="text-xl font-semibold mb-4">
              Selected Slot: {selectedSlot}
            </h2>
            <h2 className="text-xl font-semibold mb-4 mt-9">
              Classes available:
            </h2>
            <div className="">
              {getterclass(selectedDay, selectedSlot).map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setinsertclass(item[1]);
                      handleclassclick(item[0], selectedDay, selectedSlot);
                    }}
                    className="mb-2 bg-indigo-500 text-white hover:cursor-pointer hover:underline hover:font-semibold py-2 text-left pl-5 rounded-xl "
                  >
                    {item[1]}
                  </div>
                );
              })}
              <div
                onClick={() => {
                  setinsertclass("None");
                  handleclassclick("none", selectedDay, selectedSlot);
                }}
                className="mb-2 hover:cursor-pointer hover:underline hover:font-semibold py-2 rounded-xl text-left bg-indigo-500 text-white pl-5"
              >
                or Remove class
              </div>
            </div>
            <div className="mb-2 p-2 mt-10 rounded-xl text-lg ">
              Update to: {insertclass}
            </div>
            <button
              className="bg-green-600 hover:bg-green-800 text-white px-2 py-2 mt-5 rounded"
              onClick={handleClosePopup}
            >
              Confirm
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 text-white px-2 py-2 mt-5 rounded mx-3"
              onClick={normalclose}
            >
              Close
            </button>
            <div
              className={
                errorc != "success"
                  ? `text-red-800 text-center mt-1 text-lg font-semibold`
                  : `text-green-800 text-center mt-1 text-lg font-semibold`
              }
            >
              {errorc.slice(0, 9) === "ORA-20001"
                ? "Pay exceeded"
                : errorc.slice(0, 9) === "lol"
                ? "Please select class"
                : ""}
            </div>
          </div>
        </div>
      )}
      {duepopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-slate-200 p-16 rounded-lg flex flex-col z-50">
            <h2 className="text-2xl font-semibold mb-4 mx-auto">DUE left:</h2>
            <div className="text-2xl font-semibold mb-4 mx-auto">
              {info[10]}
            </div>
            <div className="mx-auto">
              <h2 className="text-2xl font-semibold mb-4 mt-10 mx-auto text-center">
                Pay dues:
              </h2>
              <input
                onChange={(e) => setpayment(e.target.value)}
                className="border-2 border-black p-2 rounded-lg"
                type="number"
              />
            </div>
            <button
              className="bg-green-600 hover:bg-green-800 text-white px-2 py-2 mt-5 rounded mx-3"
              onClick={() => handlepayment(payment)}
            >
              Pay
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 text-white px-2 py-2 mt-5 rounded mx-3"
              onClick={() => setduepopup(false)}
            >
              Close
            </button>
            <div
              className={
                error3 != "success"
                  ? `text-red-800 text-center mt-1 text-lg font-semibold`
                  : `text-green-800 text-center mt-1 text-lg font-semibold`
              }
            >
              {error3.slice(0, 9) === "ORA-20001"
                ? "Pay exceeded"
                : error3.slice(0, 9) === "success"
                ? "Success"
                : error3 === "lol"
                ? "add amount"
                : ""}
            </div>
          </div>
        </div>
      )}
      {profilepopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-slate-200 p-20 pb-16 rounded-lg flex flex-col z-50">
            <h2 className="text-2xl font-semibold mb-4">Edit your Profile:</h2>
            <input
              type="password"
              placeholder="New Password"
              className="input-field mb-3 border-2 border-black p-2"
              onChange={(e) => setupdatedpass(e.target.value)}
            />
            <input
              type="text"
              placeholder="New First Name"
              onChange={(e) => setupdatedfname(e.target.value)}
              className="input-field mb-3 border-2 border-black p-2"
            />
            <input
              type="text"
              placeholder="New Middle Name"
              onChange={(e) => setupdatedmname(e.target.value)}
              className="input-field mb-3 border-2 border-black p-2"
            />
            <input
              type="text"
              placeholder="New Last Name"
              onChange={(e) => setupdatedlname(e.target.value)}
              className="input-field mb-3 border-2 border-black p-2"
            />

            <input
              type="number"
              placeholder="New Age"
              onChange={(e) => setupdatedage(e.target.value)}
              className="input-field mb-3 border-2 border-black p-2"
            />
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="New Phone Number"
              onChange={(e) => setupdatedphnum(e.target.value)}
              className="input-field mb-3 border-2 border-black p-2"
            />
            <div className="">
              <label htmlFor="option" className="text-lg mr-12">
                Remove ph:
              </label>
              <select
                id="option"
                className="mt-2 p-1"
                onChange={(e) => setselectedph(e.target.value)}
                value={selectedph}
              >
                <option value="">Select</option>
                {phone.map((plan, index) => (
                  <option key={index} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="bg-green-600 hover:bg-green-800 text-white px-2 py-2 mt-5 rounded mx-3"
              onClick={() =>
                handleupdate(
                  updatedpass,
                  updatedfname,
                  updatedmname,
                  updatedlname,
                  updatedage,
                  updatedphnum,
                  selectedph
                )
              }
            >
              Confirm
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 text-white px-2 py-2 mt-5 rounded mx-3"
              onClick={() => setprofilepopup(false)}
            >
              Close
            </button>
            <div
              className={
                error4 !== "success"
                  ? `text-red-800 text-center mt-1 text-lg font-semibold`
                  : `text-green-800 text-center mt-1 text-lg font-semibold`
              }
            >
              {error4.slice(0, 9) === "ORA-20001"
                ? "Cannot take more than 5 facilities"
                : error4.slice(0, 9)}
            </div>
          </div>
        </div>
      )}
      {delpopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-slate-200 p-24 pb-16 rounded-lg flex flex-col z-50">
            <h2 className="text-2xl font-semibold mb-4">Are you Sure:</h2>

            <button
              onClick={finalizedelete}
              className="bg-green-600 hover:bg-green-800 text-white px-2 py-2 mt-5 rounded mx-3"
            >
              Confirm
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 text-white px-2 py-2 mt-5 rounded mx-3"
              onClick={() => setdelpopup(false)}
            >
              Close
            </button>
            <div
              className={
                error5 !== "success"
                  ? `text-red-800 text-center mt-1 text-lg font-semibold`
                  : `text-green-800 text-center mt-1 text-lg font-semibold`
              }
            >
              {error5.slice(0, 9) === "ORA-20001"
                ? "Cannot take more than 5 facilities"
                : error5.slice(0, 9) === "ORA-20003"
                ? "Please pay all your dues"
                : error5.slice(0, 9)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashBoard;
