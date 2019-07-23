import { Action } from "./appReducer";
import { lensProp, omit, set } from "ramda";

export const fetchFavoritesFromLocalStorage = () => {
  const serializedFavorites = localStorage.getItem("favorites");
  return serializedFavorites ? JSON.parse(serializedFavorites) : {};
};

const syncFavorites = (favorites, dispatch) => {
  setTimeout(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, 0);

  dispatch(Action.SetFavorites(favorites));
};

export const addFavorite = (state, dispatch, id) => {
  const newFavorites = set(lensProp(id), true, state.favorites);
  syncFavorites(newFavorites, dispatch);
};

export const removeFavorite = (state, dispatch, id) => {
  const newFavorites = omit([id], state.favorites);
  syncFavorites(newFavorites, dispatch);
};
