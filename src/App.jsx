/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */import { useState, useEffect } from "react";
import GeneralInputs from "./GeneralInputs";
import ColorPicker from "./ColorPicker";
import YearWheel from "./YearWheel";
import RingManager from "./RingManager";
import ActionInputs from "./ActionInputs";
import calendarEvents from "./calendarEvents.json";

function App() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("2024");
  const [colors, setColors] = useState(["#0D4D73", "#42A5F5", "#BDBDBD", "#FFCA28"]);
  const [ringsData, setRingsData] = useState([
    {
      data: Array.from({ length: 12 }, () => [""]),
      orientation: "vertical"
    }
  ]);
  const [selectedRingIndex, setSelectedRingIndex] = useState(0);
  const [showYearEvents, setShowYearEvents] = useState(false);
  const [yearEventsCollection, setYearEventsCollection] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("yearWheelData"));
    if (data) {
      setRingsData(data.ringsData);
      setTitle(data.title);
      setYear(data.year);
    }
  }, []);

  useEffect(() => {
    const yearEvents = calendarEvents[year] || [];
    setYearEventsCollection(yearEvents);
  }, [year]);

  const handleTitleChange = (newTitle) => setTitle(newTitle);
  const handleYearChange = (newYear) => setYear(newYear);
  const handleColorSelect = (selectedColors) => setColors(selectedColors);
  const handleShowYearEvents = (boolean) => setShowYearEvents(boolean);

  function handleSave() {
    const dataToSave = {
      title,
      year,
      colors,
      ringsData,
      selectedRingIndex,
      selectedColorIndexes: colors.map((_, index) => index),
    };

    localStorage.setItem("yearWheelData", JSON.stringify(dataToSave));
  }

  function handleReset() {
    setTitle("");
    setYear("2024");
    setColors(["#663399", "#CC3333", "#669933"]); // Reset to initial colors
    setRingsData([
      {
        data: Array.from({ length: 12 }, () => [""]),
        orientation: "vertical"
      }
    ]);
  }

  const onRingsChange = (newRings) => {
    setRingsData(newRings);
  };

  return (
    <div style={{width: '90vw',  display: "flex"}}>
      <div className="inputs">
        <GeneralInputs
          onTitleChange={handleTitleChange}
          onYearChange={handleYearChange}
          onShowYearEventsChange={handleShowYearEvents}
        />
        <div className="divider row"></div>
        <ColorPicker onColorSelect={handleColorSelect} initialColors={colors} />
        <div className="divider row"></div>
        <RingManager ringsData={ringsData} onRingsChange={onRingsChange} />
        <div className="divider row"></div>
        <ActionInputs onSave={handleSave} onReset={handleReset} />
      </div>
      <div className="year-wheel-wrapper">
        <YearWheel
          title={title}
          year={year}
          colors={colors}
          ringsData={ringsData}
          showYearEvents={showYearEvents}
          yearEventsCollection={yearEventsCollection}
        />
      </div>
    </div>
  );
}

export default App;
