import React, { useState } from "react";
import {
  concat,
  contains,
  isEmpty,
  map,
  once,
  pipe,
  pluck,
  sort,
  uniq,
  without,
} from "ramda";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { Action, useAppReducer } from "./appReducer";
import { comparatorGeneralString } from "./util";

export const allPositions = once(
  pipe(pluck("position"), uniq, sort(comparatorGeneralString)),
);

const styles = {
  formControlLabel: {
    minWidth: 200,
  },
};

const PositionFilterDialog = ({ classes }) => {
  const [state, dispatch] = useAppReducer();
  const [positions, setPositions] = useState([]);

  const handleApply = () => {
    dispatch(
      Action.SetPositionsFilterPositions(isEmpty(positions) ? null : positions),
    );
  };

  const handleClose = () => {
    dispatch(Action.HideFilterDialog);
  };

  const handleEntering = () => {
    setPositions(
      state.positionsFilterPositions ? state.positionsFilterPositions : [],
    );
  };

  const handlePositionClick = position => event => {
    const newPositions = event.target.checked
      ? concat([position], positions)
      : without([position], positions);

    setPositions(newPositions);
  };

  return (
    <Dialog
      open={state.filterDialog === "position"}
      onClose={handleClose}
      onEntering={handleEntering}
    >
      <DialogTitle>Position</DialogTitle>
      <DialogContent>
        <FormGroup>
          {map(
            position => (
              <FormControlLabel
                key={`position-${position}`}
                className={classes.formControlLabel}
                control={
                  <Checkbox
                    color="primary"
                    checked={contains(position, positions)}
                    onChange={handlePositionClick(position)}
                    value={position}
                  />
                }
                label={position}
              />
            ),
            allPositions(state.allJobApplications),
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

export default withStyles(styles)(PositionFilterDialog);
