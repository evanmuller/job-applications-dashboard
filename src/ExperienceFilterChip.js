import React from "react";
import FilterChip from "./FilterChip";
import { Action, useAppReducer } from "./appReducer";

const ExperienceFilterChip = () => {
  const [state, dispatch] = useAppReducer();

  return (
    <FilterChip
      field="Experience"
      value={`${state.experienceFilterLevel}+`}
      onClick={() => {
        dispatch(Action.ShowFilterDialog("experience"));
      }}
      onDelete={() => {
        dispatch(Action.SetExperienceFilterLevel(null));
      }}
    />
  );
};

export default ExperienceFilterChip;
