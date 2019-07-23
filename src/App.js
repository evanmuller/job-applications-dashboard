import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { AppReducerContextProvider } from "./appReducer";
import Dashboard from "./Dashboard";

const App = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <AppReducerContextProvider>
      <CssBaseline />
      <Dashboard />
    </AppReducerContextProvider>
  </MuiPickersUtilsProvider>
);

export default App;
