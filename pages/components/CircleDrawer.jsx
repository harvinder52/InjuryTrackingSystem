import React, { useRef, useEffect, useState } from "react";

import { useBodyPartsContext } from "../../BodyPartsContext";
function CircleDrawer() {
  const { state, dispatch } = useBodyPartsContext();

  const handlePartClick = (part) => {
    // Toggle the isclicked property for the clicked part
    dispatch({ type: "TOGGLE_IS_CLICKED", part });
  };
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState({ x: 0, y: 0 });
  function findSvgPart(mouseX, mouseY) {
    const svgParts = document.querySelectorAll(".bodyPart");

    svgParts.forEach((part) => {
      const partRect = part.getBoundingClientRect();
      const partX = partRect.left;
      const partY = partRect.top;
      const partWidth = partRect.width;
      const partHeight = partRect.height;

      if (
        mouseX >= partX &&
        mouseX <= partX + partWidth &&
        mouseY >= partY &&
        mouseY <= partY + partHeight
      ) {
        console.log(part);
        handlePartClick(part);
      }
    });
  }

  useEffect(() => {}, []);

  const startPainting = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const x1 = e.clientX - rect.left;
    const y1 = e.clientY - rect.top;

    context.beginPath();
    context.moveTo(x1, y1);

    setStartCoordinates({ x: x1, y: y1 });
  };

  const drawCircle = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const x2 = e.clientX - rect.left;
    const y2 = e.clientY - rect.top;

    const radius = Math.sqrt(
      Math.pow(x2 - startCoordinates.x, 2) +
        Math.pow(y2 - startCoordinates.y, 2)
    );

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(startCoordinates.x, startCoordinates.y, radius, 0, 2 * Math.PI);
    context.stroke();
  };

  const stopPainting = () => {
    setIsDrawing(false);
    console.log(startCoordinates.x, startCoordinates.y);
    findSvgPart(startCoordinates.x, startCoordinates.y);
  };

  return (
    <div
      style={{
        outline: "2px solid red",
        position: "absolute",
        top: "32px",
        left: "0px", // Added to align with the SVG
      }}
    >
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDownCapture={startPainting}
        onMouseUpCapture={stopPainting}
        onMouseMoveCapture={drawCircle}
      />
    </div>
  );
}

export default CircleDrawer;
