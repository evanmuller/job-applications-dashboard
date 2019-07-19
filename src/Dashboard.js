import React from "react";
import * as colors from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import StarOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";

const colorKeyForLetter = (colorKeys, letter) => {
  const letterIndex = letter.charCodeAt(0) - 65;
  const numColors = colorKeys.length;
  const colorIndex =
    letterIndex - Math.floor(letterIndex / numColors) * numColors;
  return colorKeys[colorIndex];
};

const colorForLetter = letter => {
  const colorKeys = Object.keys(colors).filter(c => c !== "common");
  const key = colorKeyForLetter(colorKeys, letter);
  return colors[key][600];
};

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
  filterChip: {
    margin: "8px 8px 0 0",
  },
  applicantsContainer: {
    flex: 1,
    overflow: "scroll",
  },
};

const SearchAppBar = props => (
  <div className={props.classes.container}>
    <h1 className={props.classes.title}>Job Applications Dashboard</h1>
    <div className={props.classes.toolbar}>
      <div className={props.classes.toolbarActions}>
        <span className={props.classes.applicationsCount}>200</span>
        <span className={props.classes.applicationsLabel}>applications</span>
        <div className={props.classes.flexOne} />

        <IconButton color="inherit" aria-label="Sort">
          <SortByAlphaIcon />
        </IconButton>

        <IconButton edge="end" color="inherit" aria-label="Filter">
          <FilterListIcon />
        </IconButton>
      </div>
      <div>
        <Chip
          className={props.classes.filterChip}
          label="Some filter"
          onClick={() => console.log("Clicked filter")}
          onDelete={() => console.log("Clicked filter delete")}
        />
        <Chip
          className={props.classes.filterChip}
          label="Some filter"
          onClick={() => console.log("Clicked filter")}
          onDelete={() => console.log("Clicked filter delete")}
        />
        <Chip
          className={props.classes.filterChip}
          label="Some filter"
          onClick={() => console.log("Clicked filter")}
          onDelete={() => console.log("Clicked filter delete")}
        />
        <Chip
          className={props.classes.filterChip}
          label="Some filter"
          onClick={() => console.log("Clicked filter")}
          onDelete={() => console.log("Clicked filter delete")}
        />
        <Chip
          className={props.classes.filterChip}
          label="Some filter"
          onClick={() => console.log("Clicked filter")}
          onDelete={() => console.log("Clicked filter delete")}
        />
      </div>
    </div>
    <div className={props.classes.applicantsContainer}>
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: colorForLetter("E") }}>EM</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Evan Muller"
            secondary="Server (4) - 7/12/2019"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Favorite">
              {/*<StarIcon />*/}
              <StarOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem button>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: colorForLetter("J") }}>JS</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="John Smith"
            secondary="Server (2) - 03/15/2016"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Favorite">
              {/*<StarIcon />*/}
              <StarOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem button>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: colorForLetter("J") }}>JS</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Jane Smith"
            secondary="Cook (4) - 02/08/2016"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Favorite">
              {/*<StarIcon />*/}
              <StarOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem button>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: colorForLetter("D") }}>DJ</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="David Jessup"
            secondary="Chef (2) - 03/08/2016"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Favorite">
              {/*<StarIcon />*/}
              <StarOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem button>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: colorForLetter("C") }}>CV</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Clay vanSchalkwijk"
            secondary="Cook (1) - 03/08/2016"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Favorite">
              {/*<StarIcon />*/}
              <StarOutlinedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  </div>
);

export default withStyles(styles)(SearchAppBar);
