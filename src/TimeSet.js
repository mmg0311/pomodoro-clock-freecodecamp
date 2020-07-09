import React from "react";
import "./styles.css";
const TimeSet = ({ type, value }) => {
  const [val, setVal] = value;
  const handleIncrement = () => {
    if (val >= 60) {
      return null;
    } else {
      setVal(val + 1);
    }
  };
  const handleDecrement = () => {
    if (val === 1) {
      return null;
    } else {
      setVal(val - 1);
    }
  };
  return (
    <div>
      <span id={`${type.toLowerCase()}-label`}>{type} Length</span>
      <div className="container">
        <span
          id={`${type.toLowerCase()}-increment`}
          onClick={handleIncrement}
          className="sym"
        >
          +
        </span>
        <span id={`${type.toLowerCase()}-length`} className="content">
          {val}
        </span>
        <span
          id={`${type.toLowerCase()}-decrement`}
          onClick={handleDecrement}
          className="sym"
        >
          -
        </span>
      </div>
    </div>
  );
};

export default TimeSet;
