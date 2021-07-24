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

function App() {
  return (
    <Router>
      <div>
      <Switch>
        <Route path="/doctor">
          <DocTemplate />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
