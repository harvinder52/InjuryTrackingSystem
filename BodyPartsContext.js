import React, { createContext, useContext, useReducer } from "react";

const BodyPartsContext = createContext();

export const useBodyPartsContext = () => {
  return useContext(BodyPartsContext);
};

const initialState = {
  head: { injury_details: "", isclicked: false },
  chest: { injury_details: "", isclicked: false },
  leftarm: { injury_details: "", isclicked: false },
  righthand: { injury_details: "", isclicked: false },
  leftfeet: { injury_details: "", isclicked: false },
  leftleg: { injury_details: "", isclicked: false },
  rightleg: { injury_details: "", isclicked: false },
  rightarm: { injury_details: "", isclicked: false },
  lefthand: { injury_details: "", isclicked: false },
  rightfeet: { injury_details: "", isclicked: false },
};
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_IS_CLICKED":
      console.log("Toggling isclicked for part:", action.part.id);

      if (state[action.part.id]) {
        const updatedPart = {
          ...state[action.part.id],
          isclicked: !state[action.part.id].isclicked,
        };

        return {
          ...state,
          [action.part.id]: updatedPart,
        };
      }
      return state;
    case "UPDATE_PART":
      if (state[action.part]) {
        console.log("action.value", action.data.injury_details);
        const updatedPart = {
          ...state[action.part],
          injury_details: action.data.injury_details,
        };

        return {
          ...state,
          [action.part]: updatedPart,
        };
      }

      return state;

    default:
      return state;
  }
};

export const BodyPartsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BodyPartsContext.Provider value={{ state, dispatch }}>
      {children}
    </BodyPartsContext.Provider>
  );
};
