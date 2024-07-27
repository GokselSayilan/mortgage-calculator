import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./calcInput.css";

function CalcInput({
  name,
  label,
  placeholder,
  unit,
  layout,
  value,
  onChange,
  isSubmit,
}) {
  //class state
  const [inputClass, setInputClass] = useState("idle");
  //event state
  const [isError, setIsError] = useState(false);

  const handleInputHover = (isHover) => {
    if (isHover) {
      setInputClass((prev) => (prev === "idle" ? "hover" : prev));
      return;
    }
    setInputClass((prev) => (prev === "hover" ? "idle" : prev));
  };

  const handleInputFocus = (isFocus) => {
    if (isFocus) {
      setInputClass((prev) => (prev !== "error" ? "active" : prev));
      return;
    }
    setInputClass((prev) => (prev === "active" ? "idle" : prev));
  };

  const handleInputError = () => {
    if (isError) {
      setInputClass("error");
      return;
    }
    setInputClass((prev) => (prev === "error" ? "active" : prev));
  };

  useEffect(() => {
    setIsError(false);
  }, [value]);

  useEffect(() => {
    if (isSubmit && value === "") setIsError(true);
  }, [isSubmit, value]);

  useEffect(() => {
    handleInputError();
  }, [isError]);

  return (
    <div className="calc-input-container">
      <h3 className="calc-input__label font--primary body--medium text--medium text--slate-700">
        {label}
      </h3>
      <div
        className={`calc-input__box calc-input__box--${layout} calc-input__box--${inputClass} `}
      >
        <div
          className={`calc-input__unit-box calc-input__unit-box--${inputClass} `}
        >
          <p className="calc-input__unit  font--primary heading--small text--bold">
            {unit}
          </p>
        </div>
        <input
          name={name}
          type="number"
          className="calc-input font--primary heading--small text--bold text--slate-900  "
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onMouseEnter={() => handleInputHover(true)}
          onMouseLeave={() => handleInputHover(false)}
          onFocus={() => handleInputFocus(true)}
          onBlur={() => handleInputFocus(false)}
        />
      </div>
      {isError && (
        <motion.p
          animate={{ opacity: [0, 1], y: [20, 0] }}
          transition={{ duration: 0.35 }}
          className="calc-input__error-message font--primary body--small text--medium text--red"
        >
          This field is required
        </motion.p>
      )}
    </div>
  );
}

export default CalcInput;
