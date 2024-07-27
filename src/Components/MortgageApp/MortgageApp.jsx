import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./mortgageApp.css";

import CalcInput from "../CalcInput/CalcInput";
import Radio from "../Radio/Radio";
import CalcButton from "../Button/CalcButton";

function MortgageApp() {
  const [mortgageFormValues, setMortgageFormValues] = useState({
    amount: "",
    term: "",
    interestRate: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [monthlyRepayments, setMonthlyRepayments] = useState(0);
  const [totalRepayments, setTotalRepayments] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setMortgageFormValues({ ...mortgageFormValues, [name]: value });
  };

  const handleClearAll = () => {
    setIsSubmit(false);
    setMortgageFormValues({
      amount: "",
      term: "",
      interestRate: "",
    });
    setSelectedRadio("");
  };
  const handleCalc = () => {
    const { amount, term, interestRate } = mortgageFormValues;
    setIsSubmit(true);

    const principal = parseFloat(amount);
    const termInYears = parseFloat(term);
    const payments = termInYears * 12;

    if (selectedRadio === "repayment") {
      const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;

      // Aylık ödeme hesaplaması
      const monthlyRepayments =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, payments)) /
        (Math.pow(1 + monthlyInterestRate, payments) - 1);
      const totalRepayments = monthlyRepayments * payments;

      setMonthlyRepayments(
        monthlyRepayments.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
      setTotalRepayments(
        totalRepayments.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }

    if (selectedRadio === "interest-only") {
      const annualInterestRate = parseFloat(interestRate) / 100;

      // Sadece faiz ödemesi hesaplaması
      const totalRepayments = principal * annualInterestRate * termInYears;
      const monthlyRepayments = totalRepayments / payments;

      setTotalRepayments(
        totalRepayments.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
      setMonthlyRepayments(
        monthlyRepayments.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
  };

  useEffect(() => {
    setIsSubmit(false);
  }, [mortgageFormValues]);

  return (
    <div className="mortgage-app bg--slate-100">
      <motion.div
        animate={{ opacity: [0, 1], y: [100, 0] }}
        transition={{ duration: 0.65 }}
        className="mortgage__box bg--white"
      >
        <div className="mortgage__calculator-container">
          <div className="mortgage__calculator-header">
            <h1 className="mortgage__calculator-title font--primary heading--medium text--bold text--slate-900">
              Mortgage Calculator
            </h1>
            <motion.p
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{ scale: 0.98 }}
              className="mortgage__calculator-clear font--primary body--medium text--medium text--slate-700"
              onClick={handleClearAll}
            >
              Clear All
            </motion.p>
          </div>
          <form className="mortgage__calculator-form">
            <div className="mortgage__input-container">
              <CalcInput
                name="amount"
                label="Mortgage Amount"
                placeholder="300.000"
                unit="₺"
                layout="prefix"
                value={mortgageFormValues.amount}
                onChange={handleInputChange}
                isSubmit={isSubmit}
              />
            </div>
            <div className="mortgage__input-container">
              <CalcInput
                name="term"
                label="Mortgage Term"
                placeholder="25"
                unit="years"
                layout="suffix"
                value={mortgageFormValues.term}
                onChange={handleInputChange}
                isSubmit={isSubmit}
              />
              <CalcInput
                name="interestRate"
                label="Interest Rate"
                placeholder="5.25"
                unit="%"
                layout="suffix"
                value={mortgageFormValues.interestRate}
                onChange={handleInputChange}
                isSubmit={isSubmit}
              />
            </div>
          </form>
          <div className="mortgage__calculator-radios">
            <h3 className="mortgage__radios-title font--primary body--medium text--medium text--slate-700">
              Mortgage Type
            </h3>
            <Radio
              label="Repayment"
              name="repayment"
              selectedRadio={selectedRadio}
              setSelectedRadio={setSelectedRadio}
            />
            <Radio
              label="Interest Only"
              name="interest-only"
              selectedRadio={selectedRadio}
              setSelectedRadio={setSelectedRadio}
            />
          </div>
          {selectedRadio === "" && isSubmit && (
            <motion.p
              animate={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.35 }}
              className="mortgage__radios-error font--primary body--small text--medium text--red"
            >
              This field is required
            </motion.p>
          )}

          <CalcButton
            label="Calculate Repayments"
            icon="calculator"
            onClick={handleCalc}
          />
        </div>

        <div className="mortgage__info-container bg--slate-900">
          <AnimatePresence mode="wait">
            {isSubmit &&
            mortgageFormValues.amount !== "" &&
            mortgageFormValues.interestRate !== "" &&
            mortgageFormValues.term !== "" &&
            selectedRadio !== "" ? (
              <motion.div
                key="active-layout"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                exit={{ opacity: 0, y: 40 }}
                className="info__active-layout"
              >
                <div className="info__active-header">
                  <h2 className="info__active-header-title font--primary heading--medium text--bold text--white">
                    Your results
                  </h2>
                  <p className="info__active-header-desc font--primary body--medium text--slate-300 text--medium">
                    Your results are shown below based on the information you
                    provided. To adjust the results, edit the form and click
                    “calculate repayments” again.
                  </p>
                </div>
                <div className="info__active-content-box">
                  <div className="content-box__first">
                    <h6 className="content-box__first-title font--primary body--medium text--slate-300 text--medium">
                      Your monthly repayments
                    </h6>
                    <p className="content-box__first-value font--primary heading--large text--lime text--bold">
                      ₺{monthlyRepayments}
                    </p>
                  </div>
                  <div className="info__active-sep"></div>
                  <div className="content-box__second">
                    <h6 className="content-box__second-title font--primary body--medium text--slate-300 text--medium">
                      Total you'll repay over the term
                    </h6>
                    <p className="content-box__second-value font--primary heading--medium text--bold text--white">
                      ₺{totalRepayments}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle-layout"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                exit={{ opacity: 0, y: 40 }}
                className="info__idle-layout"
              >
                <img
                  src="assets/images/illustration-empty.svg"
                  alt="calculator image"
                  className="info__idle-img"
                />
                <h2 className="info__idle-title font--primary heading--medium text--white text--bold">
                  Results shown here
                </h2>
                <p className="info__idle-desc font--primary body--medium text--slate-300 text--medium">
                  Complete the form and click “calculate repayments” to see what
                  your monthly repayments would be.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default MortgageApp;
