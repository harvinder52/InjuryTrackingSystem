import React from "react";
import HumanBodyMap from "./components/HumanBodyMap";
import CircleDrawer from "./components/CircleDrawer";
import { BodyPartsProvider } from "@/BodyPartsContext";
import SubmitReport from "./components/SubmitReport";

function InjuryReporterCanvas() {
  //   function updateWindowSize() {
  //     const windowWidth = window.innerWidth;
  //     const windowHeight = window.innerHeight;

  //     console.log("Updated Window Width: " + windowWidth);
  //     console.log("Updated Window Height: " + windowHeight);
  //   }

  //   window.addEventListener("resize", updateWindowSize);

  //   // Call the function initially to get the window dimensions on page load
  //   updateWindowSize();
  return (
    <BodyPartsProvider>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <HumanBodyMap />
          <CircleDrawer
            style={{
              border: "2px solid red",
              position: "absolute",
              top: "0",
            }}
          />
        </div>
        <SubmitReport></SubmitReport>
      </div>
    </BodyPartsProvider>
  );
}

export default InjuryReporterCanvas;
