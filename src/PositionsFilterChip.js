import React from "react";
import FilterChip from "./FilterChip";
import { Action, useAppReducer } from "./appReducer";

const PositionsFilterChip = () => {
  const [state, dispatch] = useAppReducer();

  const label =
    state.positionsFilterPositions.length === 1
      ? state.positionsFilterPositions[0]
      : `(${state.positionsFilterPositions.length})`;

  return (
    <FilterChip
      field="Positions"
      value={label}
      onClick={() => {
        dispatch(Action.ShowFilterDialog("position"));
      }}
      onDelete={() => {
        dispatch(Action.SetPositionsFilterPositions(null));
      }}
    />
  );
};

export default PositionsFilterChip;
