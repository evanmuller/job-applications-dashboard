import React, { Fragment } from "react";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    margin: "8px 8px 0 0",
  },
  field: {
    marginRight: "4px",
  },
  value: {
    fontWeight: "bold",
  },
};

const FilterChip = ({ classes, field, value, ...props }) => (
  <Chip
    className={classes.root}
    label={
      <Fragment>
        <span className={classes.field}>{`${field.toUpperCase()} ${
          value ? ":" : ""
        }`}</span>
        <span className={classes.value}>{value}</span>
      </Fragment>
    }
    {...props}
  />
);

export default withStyles(styles)(FilterChip);
