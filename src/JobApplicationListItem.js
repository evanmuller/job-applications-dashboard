import React, { Fragment } from "react";
import { join, map, pipe, split } from "ramda";
import * as colors from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import StarOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import { Action, useAppReducer } from "./appReducer";
import { addFavorite, removeFavorite } from "./favoritesSync";

export const colorKeyForLetter = (colorKeys, letter) => {
  const letterIndex = letter.charCodeAt(0) - 65;
  const numColors = colorKeys.length;
  const colorIndex =
    letterIndex - Math.floor(letterIndex / numColors) * numColors;
  return colorKeys[colorIndex];
};

const colorForName = name => {
  const colorKeys = Object.keys(colors).filter(c => c !== "common");
  const key = colorKeyForLetter(colorKeys, name.toUpperCase());
  return colors[key][600];
};

export const initialsForName = pipe(
  split(" "),
  map(n => n.charAt(0).toUpperCase()),
  join(""),
);

const JobApplicationListItem = ({ jobApplication }) => {
  const [state, dispatch] = useAppReducer();
  const isFavorite = state.favorites[jobApplication.id];

  const handleClickFavorite = () => {
    if (isFavorite) {
      removeFavorite(state, dispatch, jobApplication.id);
    } else {
      addFavorite(state, dispatch, jobApplication.id);
    }
  };

  return (
    <ListItem
      button
      onClick={() => {
        dispatch(Action.SetCurrentJobApplication(jobApplication));
      }}
    >
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: colorForName(jobApplication.name) }}>
          {initialsForName(jobApplication.name)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={jobApplication.name}
        secondary={
          <Fragment>
            <Typography variant="caption" display="block">{`${
              jobApplication.position
            } (${jobApplication.experience} ${
              jobApplication.experience === 1 ? "year" : "years"
            })`}</Typography>
            <Typography variant="caption" display="block">{`Applied - ${
              jobApplication.applied
            }`}</Typography>
          </Fragment>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="Favorite"
          onClick={handleClickFavorite}
        >
          {isFavorite ? <StarIcon /> : <StarOutlinedIcon />}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default JobApplicationListItem;
