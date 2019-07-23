import React, { useState } from "react";
import { pipe } from "ramda";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import EventIcon from "@material-ui/icons/Event";
import { DatePicker } from "@material-ui/pickers";
import { Action, useAppReducer } from "./appReducer";
import { stripTimeFromDate } from "./util";

const styles = {
  formControl: {
    minWidth: 220,
    marginBottom: "16px",
  },
};

const AppliedFilterDialog = ({ classes }) => {
  const [state, dispatch] = useAppReducer();

  const [operation, setOperation] = useState("Between");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleOperationChange = event => {
    setOperation(event.target.value);
  };

  const handleApply = () => {
    if (operation === "Between") {
      if (fromDate && toDate && fromDate.getTime() < toDate.getTime()) {
        dispatch(Action.SetAppliedFilter({ operation, fromDate, toDate }));
      }
    } else {
      dispatch(Action.SetAppliedFilter({ operation, fromDate, toDate: null }));
    }
  };

  const handleClose = () => {
    dispatch(Action.HideFilterDialog);
  };

  const handleEntering = () => {
    if (state.appliedFilter) {
      setOperation(state.appliedFilter.operation);
      setFromDate(state.appliedFilter.fromDate);
      setToDate(state.appliedFilter.toDate);
    } else {
      setOperation("Between");
      setFromDate(null);
      setToDate(null);
    }
  };

  return (
    <Dialog
      open={state.filterDialog === "applied"}
      onClose={handleClose}
      onEntering={handleEntering}
    >
      <DialogTitle>Applied</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControl className={classes.formControl}>
            <Select value={operation} onChange={handleOperationChange}>
              <MenuItem value="After">After</MenuItem>
              <MenuItem value="Before">Before</MenuItem>
              <MenuItem value="Between">Between</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <DatePicker
              label={operation === "Between" ? "From" : "Date"}
              value={fromDate}
              onChange={pipe(stripTimeFromDate, setFromDate)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <EventIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          {operation === "Between" && (
            <FormControl>
              <DatePicker
                label="To"
                value={toDate}
                onChange={pipe(stripTimeFromDate, setToDate)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <EventIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          )}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleApply} color="primary" autoFocus>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(AppliedFilterDialog);
