import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passes, setpasses] = useState("");
  const [error, seterror] = useState("");

  const handleLogin = async () => {
    await handleAddition(username);
    if (username === "admin" && password === "admin") {
      navigate("/admin");
    }
  };

  const handleAddition = async (email) => {
    let query = `select customer_id,password from customers where email='${email}'`;
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

      if (data.sol.length === 0) {
        seterror("Wrong Email");
      }
      if (response.status === 500) {
        console.log("NO SOLUTION");
        seterror("Wrong Email");
        return;
      }

      if (password === data.sol[0][1]) {
        navigate(`/user/${data.sol[0][0]}`);
      } else {
        seterror("Wrong Password");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 h-screen w-screen flex flex-row font-body justify-center items-center">
      <div className="h-full border-x-2 border-white">
        <img
          className="h-full"
          src="https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      <div className="flex flex-col ml-12 mt-16">
        <div className="bg-slate-900 border-2 border-white bg-opacity-90 p-6  flex flex-col rounded-xl shadow-lg shadow-black">
          <div className="text-white text-center font-light mt-3 text-3xl font-body">
            <p>LOG-IN</p>
          </div>
          <input
            className="border-2 border-black shadow-2xl max-h-10 w-72 mx-12 mt-16 rounded-md p-3"
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            className="border-2 border-black shadow-lg max-h-10 w-72 mx-12 mt-10 rounded-md p-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            className="border-2 border-black shadow-xl max-h-10 mx-36 mt-9 p-1 bg-green-700 hover:bg-green-800 w-20 text-white rounded-lg hover:shadow-sm hover:shadow-black"
            onClick={handleLogin}
          >
            Log-in
          </button>
          <div
            onClick={() => navigate("/create")}
            className="mb-7 max-h-10 mt-5 mx-auto text-white hover:underline hover:cursor-pointer"
          >
            <p>Not a Member? Sign-up</p>
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
        <div className="mt-6 text-white text-center text-sm">
          <p>© 2024 Your Company. All rights reserved.</p>
          <p>Terms of Service | Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
