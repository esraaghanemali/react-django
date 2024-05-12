import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ElectricityService,
  ElectricityUnit,
} from "../../../services/electricity";

type FormState = {
  date: string;
  unit: ElectricityUnit;
  amount: string; // Using string to handle form input naturally
};

const ElectricityCreate: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormState>({
    date: "",
    unit: "kWh",
    amount: "",
  });

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await ElectricityService.create({
        date: formData.date,
        unit: formData.unit,
        amount: parseFloat(formData.amount),
      });
      navigate("/");
    } catch (error) {
        console.error(error)
      alert("Error creating entry, try again later");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="entry">
        <label htmlFor="date">Date and Time:</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="entry">
        <label htmlFor="unit">Unit of Measurement:</label>
        <select
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="kWh">kWh</option>
          <option value="MWh">MWh</option>
          <option value="GJ">GJ</option>
        </select>
      </div>
      <div className="entry">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <button type="submit">Add Entry</button>
      </div>
    </form>
  );
};

export default ElectricityCreate;
