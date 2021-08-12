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
import ReceptionistRegister from "./components/Receptionist/Register";
import ReceptionistLogin from "./components/Receptionist/Login";
import AddDoctor from "./components/Receptionist/AddDoctor";
import PatientDash from './components/patient/PatientDash';
import LoginStaff from './components/Support_Staff/Staff_Login/LoginStaff';

function App() {
  return (
    <Router>
      <div>
      <Switch>
        <Route path="/doctor">
          <DocTemplate />
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
      </Switch>
    </div>
  </Router>
  );
}

export default App;
