import './App.css';
import SearchScoreScreen from './screens/SearchScoreScreen';
import Top10KhoiAScreen from './screens/Top10KhoiAScreen';
import ScoreDistributionChartScreen from './screens/ScoreDistributionChartScreen';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search-score" element={<SearchScoreScreen />} />
        <Route path="/score-chart" element={<ScoreDistributionChartScreen />} />
        <Route path="/top-10-khoi-a" element={<Top10KhoiAScreen />} />
        <Route path="/" element={<SearchScoreScreen />} />
      </Routes>
    </Router>

  );
};

export default App;
