import { createStore } from "redux";

export const setCurrentMenu = (menu) => {
  return {
    type: "SET_CURRENT_MENU",
    menu
  };
};

const initialState = {
  selectedMenu: null
};

const Menu = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
    case "SET_CURRENT_MENU":
      return {
        selectedMenu: action.menu
      }
    default:
      return state;
  }
};

export const MenuStore = createStore(Menu);

