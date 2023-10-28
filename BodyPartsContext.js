import React, { createContext, useContext, useReducer } from "react";

const BodyPartsContext = createContext();

export const useBodyPartsContext = () => {
  return useContext(BodyPartsContext);
};

const initialState = {
  head: { input1: "", input2: "", isclicked: false },
  chest: { input1: "", input2: "", isclicked: false },
  leftarm: { input1: "", input2: "", isclicked: false },
  righthand: { input1: "", input2: "", isclicked: false },
  leftfeet: { input1: "", input2: "", isclicked: false },
  leftleg: { input1: "", input2: "", isclicked: false },
  rightleg: { input1: "", input2: "", isclicked: false },
  rightarm: { input1: "", input2: "", isclicked: false },
  lefthand: { input1: "", input2: "", isclicked: false },
  rightfeet: { input1: "", input2: "", isclicked: false },
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
        console.log("action.value", action.data.input2);
        const updatedPart = {
          ...state[action.part],
          input1: action.data.input1,
          input2: action.data.input2,
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
