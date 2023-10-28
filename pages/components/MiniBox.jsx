import React from "react";
import { useBodyPartsContext } from "../../BodyPartsContext";

import { useState } from "react";
import SimpleForm from "./SimpleForm";

const CustomPopconfirm = ({
  part,
  setVisibility,
  cursorPosition,
  content,
  visibility,
  handleSubmit,
}) => {
  const [visible, setVisible] = useState(visibility || false);
  console.log("Visbility", visibility, visible);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const hidePopconfirm = () => {
    setVisible(false);
  };

  const handleConfirm = (e) => {
    handleSubmit(e);
    hidePopconfirm();
  };

  return (
    <div
      style={{
        position: "absolute",
        display: "inline",
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        width: "200px",
        zIndex: "9999",
      }}
    >
      {visible && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="bg-white flex justify-end">
            <button
              onClick={hidePopconfirm}
              className="text-white bg-red-500 border border-black border-opacity-25 p-2 rounded-md hover:bg-red-600"
            >
              X
            </button>
          </div>

          {content}
        </div>
      )}
    </div>
  );
};

const MiniBox = ({ part, cursorPosition }) => {
  const { state, dispatch } = useBodyPartsContext();
  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [visible, setVisible] = useState(true);

  const { input1, input2 } = state[part];
  console.log(part);

  const handleInputChange = (e, inputField) => {
    const { value, id } = e.target; // Extract the value from the event
    console.log("value is ", value, inputField, id);

    id === "input1" ? setInputText1(value) : setInputText2(value);

    console.log("InputTexts are", inputText1, inputText2);
    console.log(
      "InputTexts from state",
      state[part].input1,
      state[part].input2
    );
  };
  const handleSubmit = (e, inputField) => {
    e.preventDefault();

    const { value, id } = e.target;
    if (value == "") {
      return;
    }
    id === "input1" ? setInputText1(value) : setInputText2(value);
    console.log("Form submitted with data:", inputText1, inputText2);

    dispatch({
      type: "UPDATE_PART",
      part,
      data: {
        input1: inputText1,
        input2: inputText2,
      },
    });
    console.log("dispatched", inputText1, inputText2);
    setTimeout(() => {
      setVisible(false); // Change the value to false after a delay
    }, 500);
  };

  const customContent = (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{part}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="input1"
            className="block text-sm font-medium text-gray-700"
          >
            Input 1:
          </label>
          <input
            type="text"
            id="input1"
            name="input1"
            value={inputText1}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="input2"
            className="block text-sm font-medium text-gray-700"
          >
            Input 2:
          </label>
          <input
            type="text"
            id="input2"
            name="input2"
            value={inputText2}
            onChange={handleInputChange}
            className="block w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );

  return (
    visible && (
      <div>
        <CustomPopconfirm
          content={customContent}
          cursorPosition={cursorPosition}
          handleSubmit={handleSubmit}
          setVisibility={setVisible}
          visibility={visible}
        />
      </div>
    )
  );
};

export default MiniBox;
