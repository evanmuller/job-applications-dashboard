import React from "react";
import { format } from "date-fns";
import FilterChip from "./FilterChip";
import { Action, useAppReducer } from "./appReducer";

const formatDate = date => format(date, "MM/dd/yyyy");

const AppliedFilterChip = () => {
  const [state, dispatch] = useAppReducer();

  const { operation, fromDate, toDate } = state.appliedFilter;

  const value = `${operation} ${formatDate(fromDate)} ${
    toDate ? ` - ${formatDate(toDate)}` : ""
  }`;

  return (
    <FilterChip
      field="Applied"
      value={value}
      onClick={() => {
        dispatch(Action.ShowFilterDialog("applied"));
      }}
      onDelete={() => {
        dispatch(Action.SetAppliedFilter(null));
      }}
    />
  );
};

export default AppliedFilterChip;
