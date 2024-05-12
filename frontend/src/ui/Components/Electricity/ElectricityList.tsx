import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ElectricityService } from "../../../services/electricity";
import { convertElectricityToChart } from "../../../utils";
import { CharData } from "../../../utils/types";
import { BarChart } from "../../Common/BarChart";
import { Store, StoreState } from "../../Store";

const DEFAULT_UNIT = "kWh";

const ElectricityList: React.FC = () => {
  const navigate = useNavigate();

  const { electrecityData } = useContext(Store);
  const [chartData, setChartData] = useState<CharData>({
    labels: [],
    data: [],
  });

  // TODO: we can create a filter to change the unit to enable the user to change normalized data
  const [unit] = useState(DEFAULT_UNIT);

  useEffect(() => {
    if (electrecityData && electrecityData.length > 0) {
      // Extract and sort dates
      const chartData = convertElectricityToChart(electrecityData);
      setChartData({
        labels: chartData.labels,
        data: chartData.data,
      });
    } else {
      setChartData({
        labels: [],
        data: [],
      });
    }
  }, [electrecityData]);

  useEffect(() => {
    // Function to fetch and update data
    const fetchData = () => {
      StoreState.set({ loading: true });
      // TODO: Add filters
      ElectricityService.list({ from: undefined, to: undefined })
        .then((data) => {
          StoreState.set({ electrecityData: data });
        })
        .finally(() => {
          StoreState.set({ loading: false });
        });
    };
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 3000); // Fetch every 3 seconds

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="flex-end">
        <button onClick={() => navigate("/add")} className="button">
          Add new entry
        </button>
      </div>
      {chartData.data.length === 0 ? (
        <div>No Data yet</div>
      ) : (
        <BarChart
          labels={chartData.labels}
          data={chartData.data}
          chartLabel={"Energy Usage: " + unit}
        />
      )}
    </div>
  );
};

export default ElectricityList;
