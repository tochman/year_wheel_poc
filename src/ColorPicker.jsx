/* eslint-disable react/prop-types */
import{ useState } from 'react';

function ColorPicker({ onColorSelect }) {
  const colors = ["#7E57C2", "#42A5F5", "#66BB6A", "#FFCA28", "#FFCC00", "#BDBDBD", "#006699", "#663399"];
  const [selectedColors, setSelectedColors] = useState([]);

  const toggleColor = (color) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    setSelectedColors(updatedColors);
    onColorSelect(updatedColors);
  };

  return (
    <div className="color-inputs">
      {colors.map((color, index) => (
        <button
          key={index}
          className={`color-input ${selectedColors.includes(color) ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => toggleColor(color)}
        />
      ))}
    </div>
  );
}

export default ColorPicker;
