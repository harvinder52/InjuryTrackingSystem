import React, { useState } from "react";
import MiniBox from "./MiniBox";

const ToggleMiniBox = (props) => {
  console.log("toggleminibox");
  const [miniBoxVisible, setMiniBoxVisible] = useState(false);
  const [miniBoxPosition, setMiniBoxPosition] = useState({ x: 0, y: 0 });

  const showMiniBox = (event) => {
    setMiniBoxPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setMiniBoxVisible(true);
  };

  const closeMiniBox = (input1, input2) => {
    console.log("Submitted: Input1 -", input1, "Input2 -", input2);
    setMiniBoxVisible(false);
  };

  return (
    <div>
      <MiniBox
        show={miniBoxVisible}
        x={miniBoxPosition.x}
        y={miniBoxPosition.y}
        part={props.part}
        cursorPosition={props.cursorPosition}
        onClose={closeMiniBox}
      />
    </div>
  );
};

export default ToggleMiniBox;
