import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
  const [plans, setplans] = useState([]);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [fname, setfname] = useState("");
  const [mname, setmname] = useState("");
  const [lname, setlname] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const [age, setage] = useState(0);
  const [planid, setplanid] = useState("");
  const [typeofpay, settypeofpay] = useState("");
  const [phone, setphone] = useState(0);
  const [count, setcount] = useState([]);
  const [error, setError] = useState("");
  const [success, setsuccess] = useState("");

  const showsuccess = async () => {
    setError("success");
    setTimeout(function () {
      window.location.href = "/";
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  const handleAddition = async () => {
    let query = `select plan_id, plan_name from membership`;
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

      setplans(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition2 = async () => {
    let query = `select count(*) from customers`;
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

  const validateForm = () => {
    return (
      email !== "" &&
      pass !== "" &&
      cpass !== "" &&
      fname !== "" &&
      mname !== "" &&
      lname !== "" &&
      age !== "" &&
      planid !== "" &&
      typeofpay !== ""
    );
  };

  const handlesubmit = async () => {
    if (pass != cpass) {
      setError("Passwords Dont Match");
      return;
    }

    if (!validateForm()) {
      setError("Fill all the values");
      return;
    }

    try {
      //TO_DATE('2024-03-01', 'YYYY-MM-DD')
      let y = parseInt(count[0]) + 1;
      let s = formatCustomerNumbers([y]);

      let d = new Date();

      let query = `insert into customers values('${
        s[0]
      }','${fname}', '${mname}', '${lname}', '${email}', '${pass}', ${age}, '${planid}', '${typeofpay}', TO_DATE('${String(
        d
      ).slice(
        0,
        15
      )}', 'DY Mon DD YYYY'), (select plan_cost from membership where plan_id = '${planid}'), null)`;
      console.log(query);
      let q2 = `insert into phnum values('${s[0]}','${phone}')`;
      await handleAddition4(query);
      await handleAddition4(q2);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleAddition4 = async (query) => {
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
        console.log("ok");
      }

      if (response.status === 500) {
        setError(responseData.error);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const formatCustomerNumbers = (numbers) => {
    return numbers.map((number) => {
      const paddedNumber = String(number).padStart(3, "0");
      return `CUST${paddedNumber}`;
    });
  };

  useEffect(() => {
    handleAddition();
    handleAddition2();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 bg-opacity-70 w-screen h-screen p-8 flex flex-col justify-center align-middle font-body">
      <div className="max-w-md mx-auto bg-slate-900 p-12 w-max rounded-2xl">
        <p className="text-center mb-9 font-light text-3xl text-white">
          SIGN-UP
        </p>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            autoComplete="off"
            onChange={(e) => setemail(e.target.value)}
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            autoComplete="off"
            onChange={(e) => setpass(e.target.value)}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="repeat_password"
            autoComplete="off"
            onChange={(e) => setcpass(e.target.value)}
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Confirm password
          </label>
        </div>
        <div className="md:grid-cols-2 md:gap-6 flex flex-nowrap">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_f_name"
              autoComplete="off"
              onChange={(e) => setfname(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              onChange={(e) => setmname(e.target.value)}
              name="floating_mirst_name"
              id="floating_m_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Middle name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              onChange={(e) => setlname(e.target.value)}
              name="floating_last_name"
              id="floating_last_name"
              autoComplete="off"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Last name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              autoComplete="off"
              name="floating_phone"
              onChange={(e) => setphone(e.target.value)}
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone number
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              autoComplete="off"
              name="floating_company"
              onChange={(e) => setage(e.target.value)}
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Age
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="option2"
              onChange={(e) => setplanid(e.target.value)}
              value={planid}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Choose a Plan
              </option>
              {plans.map((plan, index) => (
                <option className="text-black" key={index} value={plan[0]}>
                  {plan[1]}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              autoComplete="off"
              name="floating_company"
              id="floating_company"
              onChange={(e) => settypeofpay(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Type of payment:
            </label>
          </div>
        </div>

        <button
          type="submit"
          onClick={handlesubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        {error.slice(0, 9) === "ORA-00001" ? (
          <div className="text-red-500 mt-1 mx-auto">Email Already Exists</div>
        ) : error.slice(0, 9) === "ORA-01400" ? (
          <div className="text-red-500 mt-1 mx-auto">Fill the Values</div>
        ) : error.slice(0, 9) === "success" ? (
          <div className="text-lime-500 mt-1 mx-auto">Success</div>
        ) : (
          <div className="text-red-500 mt-1 mx-auto">{error}</div>
        )}
      </div>
    </div>
  );
};

export default CreateCustomer;
