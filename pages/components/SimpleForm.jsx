import React, { useState } from "react";

import { useBodyPartsContext } from "../../BodyPartsContext";

function SimpleForm({ part }) {
  const { state, dispatch } = useBodyPartsContext();
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e, inputField) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_PART",
      part,
      data: {
        input1: inputField === "input1" ? value : input1,
        input2: inputField === "input2" ? value : input2,
      },
    });
    console.log("Form submitted with data:", formData);
    setFormData((prevState) => ({
      ...prevState,
      input1: "",
      input2: "",
    }));
  };

  return (
    <div>
      <h1>Simple Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="input1">Input 1:</label>
          <input
            type="text"
            id="input1"
            name="input1"
            value={formData.input1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="input2">Input 2:</label>
          <input
            type="text"
            id="input2"
            name="input2"
            value={formData.input2}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SimpleForm;
