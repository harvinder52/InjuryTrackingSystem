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
          {content}
        </div>
      )}
    </div>
  );
};

const MiniBox = ({ part, cursorPosition }) => {
  const { state, dispatch } = useBodyPartsContext();
  const [visible, setVisible] = useState(true);

  const { injury_details } = state[part]; // Updated to use injury_details

  const handleInputChange = (e, inputField) => {
    const { value } = e.target;
    dispatch({
      type: "UPDATE_PART",
      part,
      data: {
        injury_details: value, // Updated to use injury_details
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value, id } = e.target;
    if (value === "") {
      return;
    }
    dispatch({
      type: "UPDATE_PART",
      part,
      data: {
        injury_details: value, // Updated to use injury_details
      },
    });
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  const customContent = (
    <div className="max-w-md mx-auto ">
      <h1 className="text-2xl flex justify-between font-bold mb-4">
        {part}
        <button
          onClick={() => setVisible(false)}
          className="text-white bg-red-500 h-8 w-8 border border-black border-opacity-25  rounded-lg hover:bg-red-600"
        >
          X
        </button>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="injury_details" // Updated the label
            className="block text-sm font-medium text-gray-700"
          >
            Injury Details:
          </label>
          <input
            type="text"
            id="injury_details" // Updated the id
            name="injury_details" // Updated the name
            value={injury_details} // Updated to use injury_details
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
