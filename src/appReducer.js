import React, { createContext, useContext, useReducer } from "react";
import { taggedSum } from "daggy";
import {
  __,
  allPass,
  always,
  contains,
  curry,
  filter,
  gte,
  has,
  lensProp,
  multiply,
  pipe,
  prop,
  set,
  sort,
  useWith as rUseWith,
} from "ramda";
import {
  comparatorAppliedDate,
  comparatorGeneralString,
  comparatorNumber,
  parseAppliedDateToTime,
} from "./util";
import initialJobApplications from "./initialJobApplications.json";

const fieldComparators = {
  applied: comparatorAppliedDate,
  name: comparatorGeneralString,
  experience: comparatorNumber,
};

const sortByField = curry((field, asc, jobApplications) => {
  const comparator = pipe(
    rUseWith(fieldComparators[field], [prop(field), prop(field)]),
    multiply(asc ? 1 : -1),
  );
  return sort(comparator, jobApplications);
});

const favoritesFilterPredicate = (filter, favorites) =>
  filter ? pipe(prop("id"), has(__, favorites)) : always(true);

const positionsFilterPredicate = positions =>
  positions ? pipe(prop("position"), contains(__, positions)) : always(true);

const experienceFilterPredicate = level =>
  level ? pipe(prop("experience"), gte(__, level)) : always(true);

const appliedFilterPredicate = filter => {
  if (filter) {
    const { operation, fromDate, toDate } = filter;

    return pipe(prop("applied"), parseAppliedDateToTime, appliedTime => {
      if (operation === "Between") {
        return (
          appliedTime >= fromDate.getTime() && appliedTime <= toDate.getTime()
        );
      } else if (operation === "After") {
        return appliedTime > fromDate.getTime();
      } else {
        return appliedTime < fromDate.getTime();
      }
    });
  } else {
    return always(true);
  }
};

const setFilterDialog = set(lensProp("filterDialog"));
const setDisplayedJobApplications = set(lensProp("displayedJobApplications"));

const applyFiltersToAllJobApplications = state =>
  setDisplayedJobApplications(
    filter(
      allPass([
        favoritesFilterPredicate(state.favoritesFilter, state.favorites),
        positionsFilterPredicate(state.positionsFilterPositions),
        experienceFilterPredicate(state.experienceFilterLevel),
        appliedFilterPredicate(state.appliedFilter),
      ]),
      state.allJobApplications,
    ),
    state,
  );

const applySortToDisplayedJobApplications = state =>
  setDisplayedJobApplications(
    sortByField(
      state.sort.field,
      state.sort.asc,
      state.displayedJobApplications,
    ),
    state,
  );

const applyFilters = pipe(
  applyFiltersToAllJobApplications,
  applySortToDisplayedJobApplications,
  setFilterDialog(null),
);

const initialSort = { field: "applied", asc: false };

export const initialState = {
  allJobApplications: initialJobApplications,
  appliedFilter: null,
  currentJobApplication: null,
  displayedJobApplications: sortByField(
    initialSort.field,
    initialSort.asc,
    initialJobApplications,
  ),
  experienceFilterLevel: null,
  favorites: {},
  favoritesFilter: false,
  filterDialog: null,
  positionsFilterPositions: null,
  sort: initialSort,
};

export const Action = taggedSum("Action", {
  HideFilterDialog: [],
  SetAppliedFilter: ["filter"],
  SetCurrentJobApplication: ["jobApplication"],
  SetExperienceFilterLevel: ["level"],
  SetFavorites: ["favorites"],
  SetFavoritesFilter: ["filter"],
  SetPositionsFilterPositions: ["positions"],
  SetSort: ["field", "asc"],
  ShowFilterDialog: ["field"],
});

export const reducer = (state, action) => {
  const newState = action.cata({
    HideFilterDialog: () => setFilterDialog(null, state),
    SetAppliedFilter: filter =>
      pipe(set(lensProp("appliedFilter"), filter), applyFilters)(state),
    SetCurrentJobApplication: jobApplication =>
      set(lensProp("currentJobApplication"), jobApplication, state),
    SetExperienceFilterLevel: level =>
      pipe(set(lensProp("experienceFilterLevel"), level), applyFilters)(state),
    SetFavorites: favorites =>
      pipe(set(lensProp("favorites"), favorites), applyFilters)(state),
    SetFavoritesFilter: filter =>
      pipe(set(lensProp("favoritesFilter"), filter), applyFilters)(state),
    SetPositionsFilterPositions: positions =>
      pipe(set(lensProp("positionsFilterPositions"), positions), applyFilters)(
        state,
      ),
    SetSort: (field, asc) =>
      pipe(
        set(lensProp("sort"), { field, asc }),
        applySortToDisplayedJobApplications,
      )(state),
    ShowFilterDialog: field => setFilterDialog(field, state),
  });

  console.log("Action: %O, State: %O", action.toString(), newState);

  return newState;
};

const AppReducerContext = createContext(null);

export const useAppReducer = () => {
  const { state, dispatch } = useContext(AppReducerContext);
  return [state, dispatch];
};

export const AppReducerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </AppReducerContext.Provider>
  );
};
