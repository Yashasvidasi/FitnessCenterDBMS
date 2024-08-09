import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import LoginForm from "./components/login.jsx";
import AdminDashBoard from "./components/admindashboard.jsx";
import MemberList from "./components/memberlist.jsx";
import Individual from "./components/individual.jsx";
import ClassesList from "./components/classeslist.jsx";
import IndividualClass from "./components/individualclass.jsx";
import CreatePlan from "./components/createplan.jsx";
import EmployeeList from "./components/employeelist.jsx";
import IndividualEmp from "./components/individualemp.jsx";
import CreateClass from "./components/createclass.jsx";
import FacilitiesList from "./components/facilitieslist.jsx";
import IndividualFacility from "./components/individualfacility.jsx";
import AssignSlots from "./components/assignslots.jsx";
import CreateCustomer from "./components/createcustomer.jsx";
import UserDashBoard from "./components/userdashboard.jsx";
import RecordList from "./components/recordlist.jsx";
import CreateEmployee from "./components/createemployee.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/members" element={<MemberList />} />
        <Route path="/admin/classes" element={<ClassesList />} />
        <Route path="/admin/classes/:id" element={<Individualclass />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/admin/members/:id" element={<Individualroute />} />
        <Route path="/admin/employees/:id" element={<Individualemproute />} />
        <Route path="/admin/createplan" element={<CreatePlan />} />
        <Route path="/admin/createclass" element={<CreateClass />} />
        <Route path="/admin/employees" element={<EmployeeList />} />
        <Route path="/admin/facilities" element={<FacilitiesList />} />
        <Route path="/admin/records" element={<RecordList />} />
        <Route path="/admin/createemp" element={<CreateEmployee />} />
        <Route
          path="/admin/facilities/:id"
          element={<IndividualFacilityRoute />}
        />
        <Route path="/admin/assign/:id" element={<AssignTrainerRoute />} />
        <Route path="/create" element={<CreateCustomer />} />
        <Route path="/user/:id" element={<UserDashRoute />} />
      </Routes>
    </Router>
  );
};

const UserDashRoute = () => {
  let { id } = useParams(); // Accessing id from URL params
  return <UserDashBoard data={id} />;
};

const Individualclass = () => {
  let { id } = useParams(); // Accessing id from URL params
  return <IndividualClass data={id} />;
};

const AssignTrainerRoute = () => {
  let { id } = useParams(); // Accessing id from URL params
  return <AssignSlots data={id} />;
};

const Individualemproute = () => {
  let { id } = useParams(); // Accessing id from URL params
  return <IndividualEmp data={id} />;
};

const IndividualFacilityRoute = () => {
  let { id } = useParams(); // Accessing id from URL params
  return <IndividualFacility data={id} />;
};

const Individualroute = () => {
  let { id } = useParams(); // Accessing id from URL params
  return <Individual data={id} />;
};

export default App;
