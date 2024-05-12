import { Electricity } from "../services/electricity";
import { CharData } from "./types";

export const convertToKWh = (amount: number, unit: string) => {
  if (unit === "MWh") return amount * 1000;
  if (unit === "GJ") return amount * 277.7778; // Approximation
  return amount; // Assuming the unit is already in kWh
};

export const convertElectricityToChart = (
  electrecityData: Electricity[],
): CharData => {
  const dates = electrecityData.map((entry) => new Date(entry.date).getTime());
  const sortedDates = dates.sort((a, b) => a - b);
  const labels = sortedDates.map(
    (date) => new Date(date).toISOString().split("T")[0],
  );

  // Aggregate data per date
  const dataPerDate = new Map();
  electrecityData.forEach((entry) => {
    const dateKey = new Date(entry.date).toISOString().split("T")[0];
    const kWh = convertToKWh(entry.amount, entry.unit);
    dataPerDate.set(dateKey, (dataPerDate.get(dateKey) || 0) + kWh);
  });

  // Align data with labels
  const datasetData = labels.map((label) => dataPerDate.get(label) || 0);
  return {
    labels,
    data: datasetData,
  };
};
