import React from "react";

function SubmitReport() {
  return (
    <div className="bg-white w-full flex justifyCenter items-center">
      <div className="p-4 w-full">
        <button className="w-full py-3 bg-yellow-500 flex justifyCenter text-white shadow-md rounded-lg">
          Submit Report
          <div className="w-5 h-5 relative">
            <div className="w-full h-full rounded-full border-t-4 border-gray-100 border-solid animate-spin"></div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SubmitReport;
