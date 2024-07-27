import React from "react";
import {motion} from 'framer-motion'
import "./calcButton.css";

function CalcButton({ label, icon, onClick }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{ scale: 0.98 }}
      className="calc-button"
      onClick={onClick}
    >
      <div className="calc-button__container">
        <img src={`assets/icons/icon-${icon}.svg`} alt={`${icon} icon`} />
        <p className="calc-button__text font--primary heading--small text--slate-900 text--bold">
          {label}
        </p>
      </div>
    </motion.button>
  );
}

export default CalcButton;
