import React, { useRef, useEffect, useState } from "react";
import ToggleMiniBox from "./toggleMiniBox";

import { useBodyPartsContext } from "../../BodyPartsContext";
function CircleDrawer() {
  const { state, dispatch } = useBodyPartsContext();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handlePartClick = (part) => {
    // Toggle the isclicked property for the clicked part
    dispatch({ type: "TOGGLE_IS_CLICKED", part });
  };
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState({ x: 0, y: 0 });
  function findSvgPart(mouseX, mouseY) {
    const svgParts = document.querySelectorAll(".bodyPart");

    console.log(mouseX, mouseY);

    svgParts.forEach((part) => {
      const svg = document.querySelector("svg"); // Replace with your SVG element
      const svgRect = svg.getBoundingClientRect(); // Get the SVG's position and dimensions

      const scale = svgRect.width / 500;
      const partRect = part.getBoundingClientRect();
      const partX = partRect.left;
      const partY = partRect.top;
      const partWidth = partRect.width;
      const partHeight = partRect.height;

      console.log(partX, partY);

      if (
        mouseX >= partX &&
        mouseX <= partX + partWidth &&
        mouseY >= partY &&
        mouseY <= partY + partHeight
      ) {
        console.log("svg parts cordinates", part.id, partX, partY);
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
    console.log(x1, y1);

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
    console.log(
      "the cordinates sent are",
      startCoordinates.x,
      startCoordinates.y
    );
    findSvgPart(startCoordinates.x, startCoordinates.y);
  };

  return (
    <div style={{ outline: "2px solid black", zIndex: "9999" }}>
      <button
        style={{ position: "absolute", top: "0" }}
        onClick={() => {
          window.location.reload();
        }}
      >
        Refresh
      </button>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDownCapture={startPainting}
        onMouseUpCapture={stopPainting}
        onMouseMoveCapture={drawCircle}
      />
      {[
        "head",
        "chest",
        "leftarm",
        "rightarm",
        "righthand",
        "leftfeet",
        "righarm",
        "lefthand",
        "rightfeet",
        "leftleg",
        "rightleg",
      ].map(
        (item) =>
          state[item]?.isclicked && (
            <ToggleMiniBox part={item} cursorPosition={startCoordinates} />
          )
      )}
    </div>
  );
}

export default CircleDrawer;
