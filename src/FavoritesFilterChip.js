import React from "react";
import FilterChip from "./FilterChip";
import { Action, useAppReducer } from "./appReducer";

const FavoritesFilterChip = () => {
  const [, dispatch] = useAppReducer();

  return (
    <FilterChip
      field="Only Favorites"
      onDelete={() => {
        dispatch(Action.SetFavoritesFilter(false));
      }}
    />
  );
};

export default FavoritesFilterChip;
