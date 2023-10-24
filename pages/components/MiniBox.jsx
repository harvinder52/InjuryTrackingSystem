import React from "react";
import { useBodyPartsContext } from "../../BodyPartsContext";
import { Input, Button, Popover } from "antd";

import { useState } from "react";

const CustomPopconfirm = ({ part, cursorPosition, content, onConfirm }) => {
  const [visible, setVisible] = useState(true);

  console.log(part);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const hidePopconfirm = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    onConfirm(); // Call the provided callback function
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
        zIndex: "999",
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
          <Button
            onClick={() => {
              setVisible(false);
            }}
            type="dashed"
          >
            Save
          </Button>

          <Button onClick={hidePopconfirm}>Cancel</Button>
        </div>
      )}
    </div>
  );
};

const MiniBox = ({ part, cursorPosition }) => {
  const { state, dispatch } = useBodyPartsContext();
  console.log("minibox ", part, cursorPosition);

  const input1 = state[part].input1;
  const input2 = state[part].input2;
  console.log("inputs", input1, input2);

  const handleOk = () => {
    dispatch({
      type: "UPDATE_PART",
      part,
      data: { input1, input2 },
    });
    // Close the Popover if needed
  };

  const customContent = (
    <div>
      <h1>{part}</h1>
      <label htmlFor="input1">Label 1:</label>
      <Input
        type="text"
        id="input1"
        value={input1}
        onChange={(e) => {
          // Handle your input change logic here
        }}
      />
      <br />
      <label htmlFor="input2">Label 2:</label>
      <Input
        type="text"
        id="input2"
        value={input2}
        onChange={(e) => {
          // Handle your input change logic here
        }}
      />
    </div>
  );

  return (
    <div>
      <CustomPopconfirm
        content={customContent}
        cursorPosition={cursorPosition}
      />
    </div>
  );
};

export default MiniBox;
