import React from "react";
import Sidebar from '../components/Sidebar.js';
import ScoreDistributionChart from "../components/User/ScoreDistributionChart.js";

const ScoreDistributionChartScreen = () => {

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <ScoreDistributionChart />
      </main>
    </>
  );
};

export default ScoreDistributionChartScreen;
