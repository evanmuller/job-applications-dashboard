import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CheckIcon from "@material-ui/icons/Check";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Action, useAppReducer } from "./appReducer";

const styles = {
  favoritesMenuItem: {
    minWidth: "190px",
  },
  checkIcon: {
    marginLeft: "8px",
  },
};

const FilterMenu = ({ classes }) => {
  const [state, dispatch] = useAppReducer();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFavoritesClick = () => {
    dispatch(Action.SetFavoritesFilter(!state.favoritesFilter));
    setTimeout(() => {
      setAnchorEl(null);
    }, 200);
  };

  const handleFilterClick = filter => () => {
    dispatch(Action.ShowFilterDialog(filter));
    setAnchorEl(null);
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
        <FilterListIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          className={classes.favoritesMenuItem}
          onClick={handleFavoritesClick}
        >
          <span>Only Favorites</span>{" "}
          {state.favoritesFilter && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>

        <MenuItem onClick={handleFilterClick("position")}>Position</MenuItem>

        <MenuItem onClick={handleFilterClick("experience")}>
          Experience
        </MenuItem>

        <MenuItem onClick={handleFilterClick("applied")}>
          Application Date
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default withStyles(styles)(FilterMenu);
