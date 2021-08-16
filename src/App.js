import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//components
import DocTemplate from './components/doctor/DocTemplate';
import RegisterStaff from './components/Support_Staff/Staff_Registration/RegisterStaff';
import ReceptionistRegister from "./components/Receptionist/Authontications/Register";
import ReceptionistLogin from "./components/Receptionist/Authontications/Login";
import AddDoctor from "./components/Receptionist/AddDoctor";
import PatientDash from './components/patient/PatientDash';
import PatientLogin from './components/patient/PatientLogin';
import LoginStaff from './components/Support_Staff/Staff_Login/LoginStaff';
import NurseDashboard from './components/Support_Staff/Nurse_Dashboard/NurseDashboard';
import Patientregister from './components/patient/PatientRegister';


function App() {
  return (
    <Router>
      <div>
      <Switch>
        <Route path="/doctor">
          <DocTemplate />
        </Route> 
        <Route path="/patientreg">
          <Patientregister/>
        </Route>
        <Route path="/patientlogin">
          <PatientLogin />
        </Route>
        <Route path="/patient">
          <PatientDash />
        </Route>
        <Route path="/RegisterStaff">
          <RegisterStaff />
        </Route>
          <Route path="/receptionist-register">
              <ReceptionistRegister />
          </Route>
          <Route path="/add-doctor">
              <AddDoctor />
          </Route>
          <Route path="/receptionist-login">
              <ReceptionistLogin />
          </Route>
          <Route path="/staff-login">
              <LoginStaff />
          </Route>
          <Route path="/NurseDashboard">
              <NurseDashboard />
          </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
