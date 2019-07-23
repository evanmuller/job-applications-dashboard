import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Action, useAppReducer } from "./appReducer";
import { map, range, reverse } from "ramda";

// const allLevels = once(pipe(pluck("experience"), uniq, sort(comparator(gt))));

const styles = {
  formControl: {
    minWidth: 200,
  },
};

const ExperienceFilterDialog = ({ classes }) => {
  const [state, dispatch] = useAppReducer();
  const [level, setLevel] = useState([]);

  const handleApply = () => {
    dispatch(Action.SetExperienceFilterLevel(level));
  };

  const handleClose = () => {
    dispatch(Action.HideFilterDialog);
  };

  const handleEntering = () => {
    setLevel(state.experienceFilterLevel);
  };

  const handleChange = event => {
    setLevel(parseInt(event.target.value, 10));
  };

  return (
    <Dialog
      open={state.filterDialog === "experience"}
      onClose={handleClose}
      onEntering={handleEntering}
    >
      <DialogTitle>Experience</DialogTitle>
      <DialogContent>
        <FormControl className={classes.formControl}>
          <InputLabel>Years</InputLabel>
          <Select
            value={level}
            onChange={handleChange}
            inputProps={{
              name: "Experience Level",
            }}
          >
            {map(
              level => (
                <MenuItem key={`level-${level}`} value={level}>
                  {level}+ years
                </MenuItem>
              ),
              reverse(range(1, 5)),
              // allLevels(state.allJobApplications),
            )}
          </Select>
        </FormControl>
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

export default withStyles(styles)(ExperienceFilterDialog);
