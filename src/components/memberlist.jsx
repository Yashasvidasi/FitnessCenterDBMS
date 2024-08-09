import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import FilterComponent from "./filter.jsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MemberList = () => {
  const [toid, settoid] = useState("");
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addquery, setaddquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totallength, setotallength] = useState(0);
  const [totalPages, settotalpages] = useState(0);
  const [orderquery, setorderquery] = useState("");
  const [topmostquery, settopmostquery] = useState("select * from customers ");
  const [alreadycustomer, setalreadycustomer] = useState(true);
  const [alreadyfn, setalreadyfn] = useState(true);
  const [alreadymn, setalreadymn] = useState(true);
  const [alreadyln, setalreadyln] = useState(true);
  const [alreadyage, setalreadyage] = useState(true);
  const membersPerPage = 10;

  const [filter, setFilter] = useState({
    selectedTime: [],
    selectedDays: [],
    selectedClass: "",
    selectedOption: "",
    selectedafterDate: "",
    selectedbeforeDate: "",
    duemin: 0,
    duemax: 0,
  });

  const getquery = () => {
    let plan;
    let due;
    let date;
    let slot = "";
    let clas = "";
    let weekday = "";
    let final = "";
    let subquery = "(";
    let subquery2 = "(";

    if (filter.selectedTime.length === 0) {
      subquery = "";
    } else {
      filter.selectedTime.forEach((item, index) => {
        if (item === "Morning") {
          subquery = subquery + "'slot001'";
        } else if (item === "Afternoon") {
          subquery = subquery + "'slot002'";
        } else if (item === "Evening") {
          subquery = subquery + "'slot003'";
        }

        // Add comma if it's not the last element
        if (index < filter.selectedTime.length - 1) {
          subquery = subquery + ",";
        }
      });
      subquery = subquery + ")";
    }

    if (subquery === "") {
      subquery = `('slot001','slot002','slot003')`;
    }

    final = ` and customer_id in (select customer_id from takes_slots where slot_id in ${subquery} and  weekday in `;

    if (filter.selectedDays.length === 0) {
      subquery2 =
        "('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')";
    } else {
      filter.selectedDays.forEach((item, index) => {
        subquery2 = subquery2 + `'${item}'`;
        // Add comma if it's not the last element
        if (index < filter.selectedDays.length - 1) {
          subquery2 = subquery2 + ",";
        }
      });
      subquery2 = subquery2 + ")";
    }

    final = final + subquery2;

    if (filter.selectedClass === "") {
      clas = ``;
    } else {
      clas = ` and class_id = '${filter.selectedClass}'`;
    }

    final = final + clas + ")";

    if (
      filter.selectedTime.length === 0 &&
      filter.selectedDays.length === 0 &&
      filter.selectedClass === ""
    ) {
      final = "";
    }

    if (filter.selectedOption === "") {
      plan = ``;
    } else {
      plan = ` and c.plan_id = '${filter.selectedOption}' `;
    }

    if (filter.duemin === 0 && filter.duemax === 0) {
      due = ` c.dues >= 0`;
    } else if (filter.duemin === filter.duemax) {
      due = ` c.dues = ${filter.duemin}`;
    } else {
      due = ` c.dues between ${filter.duemin} and ${filter.duemax}`;
    }

    if (filter.selectedafterDate === "" && filter.selectedbeforeDate === "") {
      date = "";
    } else if (
      filter.selectedafterDate === "" &&
      filter.selectedbeforeDate != ""
    ) {
      date = ` and c.enroll_date < TO_DATE('${filter.selectedbeforeDate}', 'YYYY-MM-DD')`;
    } else if (
      filter.selectedafterDate != "" &&
      filter.selectedbeforeDate === ""
    ) {
      date = ` and c.enroll_date > TO_DATE('${filter.selectedafterDate}', 'YYYY-MM-DD') `;
    } else if (filter.selectedafterDate === filter.selectedbeforeDate) {
      date = ` and c.enroll_date = TO_DATE('${filter.selectedbeforeDate}', 'YYYY-MM-DD') `;
    } else {
      date = ` and c.enroll_date between TO_DATE('${filter.selectedafterDate}', 'YYYY-MM-DD') and TO_DATE('${filter.selectedbeforeDate}', 'YYYY-MM-DD') `;
    }

    let q = "select * from customers c where " + due + plan + date + final;
    settopmostquery(q);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4]); // Initially display first 4 pages

  const updateVisiblePages = (pageNumber) => {
    const lastPage = totalPages;
    let newVisiblePages = [pageNumber];
    if (pageNumber > 2 && pageNumber < lastPage - 1) {
      newVisiblePages = [
        pageNumber - 1,
        pageNumber,
        pageNumber + 1,
        pageNumber + 2,
      ];
    } else if (pageNumber === 2) {
      newVisiblePages = [
        pageNumber - 1,
        pageNumber,
        pageNumber + 1,
        pageNumber + 2,
      ];
    } else if (pageNumber === 1) {
      newVisiblePages = [
        pageNumber,
        pageNumber + 1,
        pageNumber + 2,
        pageNumber + 3,
      ];
    } else if (pageNumber === lastPage - 1) {
      newVisiblePages = [
        pageNumber - 2,
        pageNumber - 1,
        pageNumber,
        pageNumber + 1,
      ];
    } else if (pageNumber === lastPage) {
      newVisiblePages = [
        pageNumber - 3,
        pageNumber - 2,
        pageNumber - 1,
        pageNumber,
      ];
    }
    setVisiblePages(newVisiblePages);
  };

  // Fetch data when the currentPage changes
  useEffect(() => {
    handleAddition(query());
    getquery();
  }, [currentPage, orderquery, searchTerm]);

  // Filter members based on search term
  useEffect(() => {
    const filtered = members.filter((member) =>
      member[0].toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
    getquery();
  }, [searchTerm, members]);

  const query = () => {
    const offset = (currentPage - 1) * membersPerPage;
    let query;
    if (totallength === 0) {
      query = `SELECT * FROM CUSTOMERS`;
    } else {
      query =
        `SELECT z.customer_id, z.first_name, z.middle_name, z.last_name, z.email, z.password, z.age FROM (SELECT x.customer_id, x.first_name, x.middle_name, x.last_name, x.email, x.password, x.age, ROWNUM as rn FROM (select * from (${topmostquery}) y ` +
        addquery +
        orderquery +
        `) x WHERE ROWNUM <= ${
          offset + membersPerPage
        }) z WHERE z.rn > ${offset}`;
    }
    return query;
  };

  const handleAddition = async (query) => {
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

      if (totallength === 0) {
        setotallength(data.sol.length);
        settotalpages(Math.ceil(data.sol.length / membersPerPage));
        setMembers(data.sol.slice(0, 10));
        return;
      }

      setMembers(data.sol);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const rotate = (icon) => {
    if (icon === true) {
      return "";
    } else {
      return "rotate";
    }
  };

  const resetall = () => {
    setalreadycustomer(true);
    setalreadyfn(true);
    setalreadymn(true);
    setalreadyln(true);
    setalreadyage(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateVisiblePages(pageNumber);
  };

  const caller = (value) => {
    setSearchTerm(value);
    setaddquery(
      ` WHERE LOWER(TO_CHAR(customer_id)) like '${value.toLowerCase()}%' or LOWER(first_name) like '${value.toLowerCase()}%' or LOWER(middle_name) like '${value.toLowerCase()}%' or LOWER(last_name) like '${value.toLowerCase()}%' or LOWER(TO_CHAR(email)) like '${value.toLowerCase()}%' or LOWER(TO_CHAR(age)) like '${value.toLowerCase()}%'`
    );
  };

  useEffect(() => {
    handleAddition(query());
  }, [topmostquery]); // useEffect dependency on count

  return (
    <div className="bg-gradient-to-br from-indigo-800/85 to-cyan-400/75 w-screen">
      <div className="flex flex-row justify-between">
        <FilterComponent
          onFilterChange={handleFilterChange}
          onsearch={() => {
            handleAddition(query());
          }}
        />
        <div className="flex flex-col overflow-auto mx-auto mt-10 mb-16 w-fit justify-center">
          <div className="rounded-xl bg-slate-100 bg-opacity-65 px-8 pb-7 ">
            <div className="flex flex-col">
              <form className="p-5" role="search">
                <input
                  key="mainin"
                  className="w-full p-1 rounded-lg"
                  type="search"
                  placeholder="Search........."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => caller(e.target.value)}
                />
              </form>
            </div>
            <table className="border-2 border-black">
              <thead className="border-separate p-16 border-2 border-black ">
                <tr>
                  <th className="p-4 border-2 border-black">
                    Customer_id{" "}
                    <i
                      key="customer-icon"
                      className=""
                      onClick={() => {
                        alreadycustomer
                          ? setorderquery("order by customer_id asc")
                          : setorderquery("order by customer_id desc");
                        resetall();
                        setalreadycustomer(!alreadycustomer);
                      }}
                    ></i>
                  </th>
                  <th className="p-4 border-2 border-black">
                    First Name{" "}
                    <i
                      className=""
                      onClick={() => {
                        alreadyfn
                          ? setorderquery("order by first_name asc")
                          : setorderquery("order by first_name desc");
                        resetall();
                        setalreadyfn(!alreadyfn);
                      }}
                    ></i>
                  </th>
                  <th className="p-4 border-2 border-black">
                    Middle Name{" "}
                    <i
                      className=""
                      onClick={() => {
                        alreadymn
                          ? setorderquery("order by middle_name asc")
                          : setorderquery("order by middle_name desc");
                        resetall();
                        setalreadymn(!alreadymn);
                      }}
                    ></i>
                  </th>
                  <th className="p-4 border-2 border-black">
                    Last Name{" "}
                    <i
                      className=""
                      onClick={() => {
                        alreadyln
                          ? setorderquery("order by last_name asc")
                          : setorderquery("order by last_name desc");
                        resetall();
                        setalreadyln(!alreadyln);
                      }}
                    ></i>
                  </th>
                  <th>Email </th>
                  <th className="p-4 border-2 border-black">
                    Age{" "}
                    <i
                      className={"fas fa-arrow-up " + rotate(alreadyage)}
                      onClick={() => {
                        alreadyage
                          ? setorderquery("order by age asc")
                          : setorderquery("order by age desc");
                        resetall();
                        setalreadyage(!alreadyage);
                      }}
                    ></i>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {members.map((member, index) => (
                  <tr
                    key={index}
                    className="hover:border-2 hover:border-black hover:cursor-pointer hover:shadow-md hover:shadow-black"
                    onClick={() => {
                      navigate(`/admin/members/${member[0]}`);
                      settoid(member[0]);
                    }}
                  >
                    <td className="px-8 py-2">{member[0]}</td>
                    <td className="px-8">{member[1]}</td>
                    <td className="px-8">{member[2]}</td>
                    <td className="px-8">{member[3]}</td>
                    <td className="px-8">{member[4]}</td>
                    <td className="px-4">{member[6]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" overflow-hidden flex flex-row-reverse mt-8  mr-8">
            <nav className="bg-slate-300 bg-opacity-85 w-fit rounded-l-xl rounded-r-xl  ">
              <ul className="flex flex-row w-72 border-black">
                <li
                  onClick={() =>
                    currentPage === 1
                      ? console.log("ok")
                      : handlePageChange(currentPage - 1)
                  }
                  className={`${
                    currentPage === 1
                      ? "text-gray-500 hover:cursor-default"
                      : "hover:shadow-xl hover:shadow-black hover:text-white hover:bg-slate-700 hover:rounded-l-md hover:cursor-pointer"
                  } my-auto px-3  active:bg-blue-500`}
                >
                  <div>Previous</div>
                </li>
                {visiblePages.map((pageNumber) => (
                  <li
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`${
                      currentPage === pageNumber
                        ? "bg-blue-500"
                        : "hover:shadow-xl hover:shadow-black hover:text-white hover:bg-slate-700 hover:cursor-pointer"
                    } my-auto  px-3  active:`}
                  >
                    <div className="">{pageNumber}</div>
                  </li>
                ))}

                <li
                  onClick={() =>
                    currentPage === totalPages
                      ? console.log("ok")
                      : handlePageChange(currentPage + 1)
                  }
                  className={`${
                    currentPage === totalPages
                      ? "text-gray-300 hover:cursor-default"
                      : "hover:shadow-xl hover:shadow-black hover:text-white hover:bg-slate-700 hover:rounded-r-md hover:cursor-pointer"
                  } my-auto px-3  active:bg-blue-500`}
                >
                  <div className="">Next</div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
