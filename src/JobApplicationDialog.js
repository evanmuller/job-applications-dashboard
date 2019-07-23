import React, { Fragment, useState } from "react";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { addIndex, map, toPairs } from "ramda";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import StarIcon from "@material-ui/icons/Star";
import StarOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import { Action, useAppReducer } from "./appReducer";
import { addFavorite, removeFavorite } from "./favoritesSync";

const styles = {
  root: {
    "& .MuiTypography-gutterBottom": {
      marginBottom: ".75em",
    },
  },
  row: {
    display: "flex",
  },
  column: {
    flex: "1",
  },
  availabilityChipsContainer: {
    marginBottom: ".75em",
  },
  availabilityChip: {
    margin: "0 8px 8px 0",
  },
  availabilityChipDay: {
    marginRight: "4px",
    fontWeight: "bold",
  },
  availabilityChipValue: {},
  dialogTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const JobApplicationDialog = ({ classes }) => {
  const [state, dispatch] = useAppReducer();
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isFavorite = state.favorites[state.currentJobApplication.id];

  const handleExpand = index => () => {
    setExpandedQuestionIndex(index);
  };

  const handleClickFavorite = () => {
    if (isFavorite) {
      removeFavorite(state, dispatch, state.currentJobApplication.id);
    } else {
      addFavorite(state, dispatch, state.currentJobApplication.id);
    }
  };

  const handleClose = () => {
    dispatch(Action.SetCurrentJobApplication(null));
  };

  return (
    <Dialog
      className={classes.root}
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
    >
      <DialogTitle>
        <div className={classes.dialogTitleRow}>
          <span>{state.currentJobApplication.name}</span>
          <IconButton
            edge="end"
            aria-label="Favorite"
            onClick={handleClickFavorite}
          >
            {isFavorite ? <StarIcon /> : <StarOutlinedIcon />}
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={classes.row}>
          <div className={classes.column}>
            <Typography variant="overline" display="block">
              Name
            </Typography>
            <Typography variant="body1" display="block" gutterBottom>
              {state.currentJobApplication.name}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography variant="overline" display="block">
              Position
            </Typography>
            <Typography variant="body1" display="block" gutterBottom>
              {state.currentJobApplication.position}
            </Typography>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            <Typography variant="overline" display="block">
              Applied
            </Typography>
            <Typography variant="body1" display="block" gutterBottom>
              {state.currentJobApplication.applied}
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography variant="overline" display="block">
              Experience
            </Typography>
            <Typography variant="body1" display="block" gutterBottom>
              {state.currentJobApplication.experience}{" "}
              {state.currentJobApplication.experience === 1 ? "year" : "years"}
            </Typography>
          </div>
        </div>
        <Typography variant="overline" display="block">
          Availability
        </Typography>
        <div className={classes.availabilityChipsContainer}>
          {map(
            ([day, value]) => (
              <Chip
                className={classes.availabilityChip}
                key={`day-chip-${day}`}
                {...(value ? { color: "primary" } : { variant: "outlined" })}
                label={
                  <Fragment>
                    <span className={classes.availabilityChipDay}>{day}</span>
                    <span className={classes.availabilityChipValue}>
                      ({value})
                    </span>
                  </Fragment>
                }
              />
            ),
            toPairs(state.currentJobApplication.availability),
          )}
        </div>
        <Typography variant="overline" display="block">
          Questions
        </Typography>
        <div>
          {addIndex(map)(
            ({ text, answer }, index) => (
              <ExpansionPanel
                square
                key={`question-panel-${index}`}
                expanded={index === expandedQuestionIndex}
                onChange={handleExpand(index)}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{text}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{answer}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ),
            state.currentJobApplication.questions,
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(JobApplicationDialog);
