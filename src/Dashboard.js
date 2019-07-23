import React, { Fragment, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import grey from "@material-ui/core/colors/grey";
import AppliedFilterChip from "./AppliedFilterChip";
import AppliedFilterDialog from "./AppliedFilterDialog";
import ExperienceFilterChip from "./ExperienceFilterChip";
import ExperienceFilterDialog from "./ExperienceFilterDialog";
import FavoritesFilterChip from "./FavoritesFilterChip";
import FilterMenu from "./FilterMenu";
import JobApplicationDialog from "./JobApplicationDialog";
import JobApplicationListItem from "./JobApplicationListItem";
import PositionFilterDialog from "./PositionFilterDialog";
import PositionsFilterChip from "./PositionsFilterChip";
import SortMenu from "./SortMenu";
import { Action, useAppReducer } from "./appReducer";
import { fetchFavoritesFromLocalStorage } from "./favoritesSync";

const styles = {
  container: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    alignItems: "center",
    padding: "28px 18px",
    margin: 0,
    fontWeight: 400,
    background: "linear-gradient(0deg,#262262,#4c2d79)",
    color: "white",
    fontSize: "1.5em",
  },
  toolbar: {
    backgroundColor: grey[100],
    boxShadow: `0 1px 1px ${grey[500]}`,
    padding: "14px 18px",
  },
  toolbarActions: {
    display: "flex",
    alignItems: "center",
  },
  applicationsCount: {
    fontSize: "2.25em",
    marginRight: "12px",
    fontWeight: 500,
  },
  applicationsLabel: {
    fontSize: "1.25em",
  },
  flexOne: {
    flex: 1,
  },
  applicantsContainer: {
    flex: 1,
    overflow: "scroll",
  },
};

const Dashboard = ({ classes }) => {
  const [state, dispatch] = useAppReducer();

  useEffect(
    () => {
      dispatch(Action.SetFavorites(fetchFavoritesFromLocalStorage()));
    },
    [dispatch],
  );

  return (
    <Fragment>
      <div className={classes.container}>
        <h1 className={classes.title}>Job Applications Dashboard</h1>
        <div className={classes.toolbar}>
          <div className={classes.toolbarActions}>
            <span className={classes.applicationsCount}>
              {state.displayedJobApplications.length}
            </span>
            <span className={classes.applicationsLabel}>Applications</span>
            <div className={classes.flexOne} />
            <SortMenu />
            <FilterMenu />
          </div>
          <div>
            {state.favoritesFilter && <FavoritesFilterChip />}
            {state.appliedFilter && <AppliedFilterChip />}
            {state.experienceFilterLevel && <ExperienceFilterChip />}
            {state.positionsFilterPositions && <PositionsFilterChip />}
          </div>
        </div>
        <div className={classes.applicantsContainer}>
          <List>
            {state.displayedJobApplications.map((jobApplication, index) => (
              <Fragment key={`job-application-${index}`}>
                <JobApplicationListItem jobApplication={jobApplication} />
                {index + 1 !== state.displayedJobApplications.length && (
                  <Divider />
                )}
              </Fragment>
            ))}
          </List>
        </div>
      </div>

      <AppliedFilterDialog />
      <ExperienceFilterDialog />
      <PositionFilterDialog />
      {state.currentJobApplication && <JobApplicationDialog />}
    </Fragment>
  );
};

export default withStyles(styles)(Dashboard);
