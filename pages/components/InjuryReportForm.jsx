import React, { useState } from "react";
import { useRouter } from "next/router";

function InjuryReportForm({ user }) {
  const [reporterName, setReporterName] = useState("");
  const [injuryDateTime, setInjuryDateTime] = useState("");

  const handleReporterNameChange = (event) => {
    setReporterName(event.target.value);
    console.log(user);
  };

  const handleInjuryDateTimeChange = (event) => {
    setInjuryDateTime(event.target.value);
  };

  const router = useRouter();

  const handleButtonClick = () => {
    // Use router.push to navigate to the "/CircleDrawer" route
    router.push("/InjuryReporterCanvas");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here, you can perform actions with the reporterName and injuryDateTime
    // such as sending them to a server, storing them in a state, or any other logic you need.

    // For this example, we'll just log the values to the console.
    console.log("Reporter Name: " + reporterName);
    console.log("Injury Date and Time: " + injuryDateTime);

    // Clear the form after submission
    setReporterName("");
    setInjuryDateTime("");
    router.push("/InjuryReporterCanvas");
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Injury Report Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="reporterName"
            className="block text-sm font-medium text-gray-700"
          >
            Reporter Name:
          </label>
          <input
            type="text"
            id="reporterName"
            value={user}
            disabled
            onChange={handleReporterNameChange}
            required
            className="block w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="injuryDateTime"
            className="block text-sm font-medium text-gray-700"
          >
            Date and Time of Injury:
          </label>
          <input
            type="datetime-local"
            id="injuryDateTime"
            value={injuryDateTime}
            onChange={handleInjuryDateTimeChange}
            required
            className="block w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white font-semibold p-2 rounded-md hover:bg-indigo-600"
        >
          Create New Injury Report
        </button>
      </form>
    </div>
  );
}

export default InjuryReportForm;
