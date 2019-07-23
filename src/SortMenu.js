import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useAppReducer } from "./appReducer";
import green from "@material-ui/core/colors/green";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import { Action } from "./appReducer";

const styles = {
  menuItemLabel: {
    marginRight: "8px",
  },
  arrowIcon: {
    color: green[600],
  },
};

const SortMenu = ({ classes }) => {
  const [state, dispatch] = useAppReducer();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSortClick = (field, defaultAsc) => () => {
    const asc = state.sort.field === field ? !state.sort.asc : defaultAsc;

    dispatch(Action.SetSort(field, asc));

    setTimeout(() => {
      setAnchorEl(null);
    }, 200);
  };

  return (
    <Fragment>
      <IconButton
        color="inherit"
        aria-label="Sort"
        onClick={e => {
          setAnchorEl(e.currentTarget);
        }}
      >
        <SortByAlphaIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem onClick={handleSortClick("applied", false)}>
          <span className={classes.menuItemLabel}>
            Sort by application date
          </span>
          {"applied" === state.sort.field &&
            (state.sort.asc ? (
              <ArrowUpwardIcon className={classes.arrowIcon} />
            ) : (
              <ArrowDownwardIcon className={classes.arrowIcon} />
            ))}
        </MenuItem>
        <MenuItem onClick={handleSortClick("experience", false)}>
          <span className={classes.menuItemLabel}>
            Sort by experience level
          </span>
          {"experience" === state.sort.field &&
            (state.sort.asc ? (
              <ArrowUpwardIcon className={classes.arrowIcon} />
            ) : (
              <ArrowDownwardIcon className={classes.arrowIcon} />
            ))}
        </MenuItem>
        <MenuItem onClick={handleSortClick("name", true)}>
          <span className={classes.menuItemLabel}>Sort by name</span>
          {"name" === state.sort.field &&
            (state.sort.asc ? (
              <ArrowUpwardIcon className={classes.arrowIcon} />
            ) : (
              <ArrowDownwardIcon className={classes.arrowIcon} />
            ))}
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default withStyles(styles)(SortMenu);
