import { createContext, useReducer } from "react";
import "./App.css";
import { Home } from "./Components/Home";
import Details from "./Components/Details";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Userhist from "./Components/Userhist";

import { reducer, initialState } from "./reducers/UseReducer";


export const UserContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  var date = new Date();
  var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  const [from, setFrom] = useState("CCU");
  const [to, setTo] = useState("BLR");
  const [depart, setDepart] = useState(`${dateString}`);
  const [ret, setRet] = useState("");

  return (

    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Navbar />

        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Home
                setFrom={setFrom}
                setTo={setTo}
                setDepart={setDepart}
                setRet={setRet}
                from={from}
                to={to}
                depart={depart}
                ret={ret}
              />
            )}
          />
          <Route
            path="/details"
            exact
            component={() => (
              <Details from={from} to={to} ret={ret} depart={depart} />
            )}
          />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/userhistory" component={Userhist} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
