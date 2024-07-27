import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./radio.css";

function Radio({ label, name, selectedRadio, setSelectedRadio }) {
  //class state
  const [radioClass, setRadioClass] = useState("idle");

  const handleRadioHover = (isHover) => {
    if (isHover) {
      setRadioClass((prev) => (prev === "idle" ? "hover" : prev));
      return;
    }
    setRadioClass((prev) => (prev === "hover" ? "idle" : prev));
  };

  useEffect(() => {
    if (selectedRadio === name) setRadioClass("active");
    else setRadioClass("idle");
  }, [selectedRadio, name]);

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`radio-container radio-container--${radioClass}`}
      onClick={() => setSelectedRadio(name)}
      onMouseEnter={() => handleRadioHover(true)}
      onMouseLeave={() => handleRadioHover(false)}
    >
      <div className="radio__select-box">
        <div className={`radio__circle radio__circle--${radioClass}`}>
          {selectedRadio === name && <div className="radio__fill"></div>}
        </div>
      </div>
      <h3 className="radio__text font--primary heading--small text--bold text--slate-900">
        {label}
      </h3>
    </motion.div>
  );
}

export default Radio;
