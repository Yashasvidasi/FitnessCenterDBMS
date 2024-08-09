import React, { useState, useEffect } from "react";

const FilterComponent = ({ onFilterChange, onsearch }) => {
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedafterDate, setSelectedafterDate] = useState("");
  const [selectedbeforeDate, setSelectedbeforeDate] = useState("");
  const [plans, setPlans] = useState([]);
  const [classes, setClasses] = useState([]);
  const [duemin, setduemin] = useState(0);
  const [duemax, setduemax] = useState(99999);

  useEffect(() => {
    // Call the async function when the component mounts
    caller();
    caller2();
  }, []);

  const handleTimeChange = (e) => {
    const time = e.target.value;
    const updatedSelectedTime = selectedTime.includes(time)
      ? selectedTime.filter((item) => item !== time)
      : [...selectedTime, time];
    setSelectedTime(updatedSelectedTime);
    onFilterChange({
      selectedTime: updatedSelectedTime,
      selectedDays,
      selectedClass,
      selectedOption,
      selectedafterDate,
      selectedbeforeDate,
      duemin,
      duemax,
    });
  };

  const handleDayChange = (e) => {
    const day = e.target.value;
    const updatedSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((item) => item !== day)
      : [...selectedDays, day];
    setSelectedDays(updatedSelectedDays);
    onFilterChange({
      selectedTime,
      selectedDays: updatedSelectedDays,
      selectedClass,
      selectedOption,
      selectedafterDate,
      selectedbeforeDate,
      duemin,
      duemax,
    });
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    onFilterChange({
      selectedTime,
      selectedDays,
      selectedClass,
      selectedOption: option,
      selectedafterDate,
      selectedbeforeDate,
      duemin,
      duemax,
    });
  };

  const handleClassChange = (e) => {
    const option = e.target.value;
    setSelectedClass(option);
    onFilterChange({
      selectedTime,
      selectedDays,
      selectedClass: option,
      selectedOption,
      selectedafterDate,
      selectedbeforeDate,
      duemin,
      duemax,
    });
  };

  const handleafterDateChange = (e) => {
    const date = e.target.value;
    setSelectedafterDate(date);
    onFilterChange({
      selectedTime,
      selectedDays,
      selectedClass,
      selectedOption,
      selectedafterDate: date,
      selectedbeforeDate,
      duemin,
      duemax,
    });
  };

  const handlebeforeDateChange = (e) => {
    const date = e.target.value;
    setSelectedbeforeDate(date);
    onFilterChange({
      selectedTime,
      selectedDays,
      selectedClass,
      selectedOption,
      selectedafterDate,
      selectedbeforeDate: date,
      duemin,
      duemax,
    });
  };

  const handleduemax = (e) => {
    const range = parseInt(e.target.value);
    setduemax(range);
    onFilterChange({
      selectedTime,
      selectedDays,
      selectedClass,
      selectedOption,
      selectedafterDate,
      selectedbeforeDate,
      duemin,
      duemax: range,
    });
  };

  const handleduemin = (e) => {
    const range = parseInt(e.target.value);
    setduemin(range);
    onFilterChange({
      selectedTime,
      selectedDays,
      selectedClass,
      selectedOption,
      selectedafterDate,
      selectedbeforeDate,
      duemin: range,
      duemax,
    });
  };

  const caller = async () => {
    let query = "select * from membership";
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
      console.log(data);
      setPlans(data.sol);
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const caller2 = async () => {
    let query = "select * from classes";
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
      console.log(data);
      setClasses(data.sol);
      if (response.status === 500) {
        console.log("NO SOLUTION");
        return;
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-indigo-50 bg-opacity-50 p-5 pt-1 border-r-4 border-black overflow-auto w-64"
      onLoad={() => {
        caller();
        caller2();
      }}
    >
      <br />
      <label htmlFor="option" className="text-xl font-bold mb-2">
        Choose Shift :
      </label>
      <div>
        {["Morning", "Afternoon", "Evening"].map((day) => (
          <div key={day}>
            <input
              type="checkbox"
              className="hover:cursor-pointer hover:border-black"
              id={day}
              value={day}
              onChange={handleTimeChange}
              checked={selectedTime.includes(day)}
            />
            <label htmlFor={day}>{" --" + day}</label>
          </div>
        ))}
      </div>
      <br />
      <div>
        <label className="text-xl font-bold mb-2">Days of Week:</label>
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <div key={day}>
            <input
              className="mt-2"
              type="checkbox"
              id={day}
              value={day}
              onChange={handleDayChange}
              checked={selectedDays.includes(day)}
            />
            <label htmlFor={day}>{" --" + day}</label>
          </div>
        ))}
      </div>
      <br />
      <div>
        <label htmlFor="option" className="text-xl font-bold mb-2">
          Choose a class:
        </label>
        <select
          id="option"
          className="mt-2 p-1 rounded-xl"
          onChange={handleClassChange}
          value={selectedClass}
        >
          <option value="">Select</option>
          {classes.map((plan, index) => (
            <option key={index} value={plan[0]}>
              {plan[1]}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label htmlFor="option2" className="text-xl font-bold mb-2">
          Choose a plan:
        </label>
        <select
          id="option2"
          className="mt-2 p-1 rounded-xl"
          onChange={handleOptionChange}
          value={selectedOption}
        >
          <option value="">Select</option>
          {plans.map((plan, index) => (
            <option key={index} value={plan[0]}>
              {plan[1]}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label htmlFor="date" className="text-xl font-bold mb-2">
          Joined after date:{" "}
        </label>
        <input
          type="date"
          id="date"
          className="mt-2 p-1 rounded-xl"
          onChange={handleafterDateChange}
          value={selectedafterDate}
        />
      </div>
      <br />
      <div>
        <label htmlFor="date" className="text-xl font-bold mb-2">
          Joined before date:
        </label>
        <input
          type="date"
          id="date"
          className="mt-2 p-1 rounded-xl"
          onChange={handlebeforeDateChange}
          value={selectedbeforeDate}
        />
      </div>
      <br />
      <div>
        <label htmlFor="priceRange1" className="text-xl font-bold mb-2">
          Due amount min:
        </label>
        <input
          className="mt-2"
          type="range"
          id="priceRange"
          min="0"
          max="10000"
          value={duemin}
          onChange={handleduemin}
        />
        <span>{duemin}</span>
      </div>

      <div>
        <label htmlFor="priceRange2" className="text-xl font-bold mb-2">
          Due amount max:
        </label>
        <input
          className="mt-2"
          type="range"
          id="priceRange"
          min="0"
          max="10000"
          value={duemax}
          onChange={handleduemax}
        />
        <span>{duemax}</span>
      </div>
      <br />
      <div
        className="bg-green-600 text-center border-2 border-black shadow-sm hover:shadow-lg hover:shadow-black hover:text-center hover:bg-green-800 hover:text-white hover:cursor-pointer p-1 rounded-xl mb-10 px-16 mx-auto"
        onClick={onsearch}
      >
        Search
      </div>
    </div>
  );
};

export default FilterComponent;
