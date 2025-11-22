import React, { useState, useEffect, useCallback } from "react";

const NumberPad = ({ addSelectedItem, getAmount }) => {
  const [value, setValue] = useState("0");
  const [activeButton, setActiveButton] = useState(null);


  const handleClick = useCallback(
    (digit) => {
      
      setTimeout(() => {
        setValue((prevValue) => {
          if (digit === "Back Space") {
            const newValue = prevValue.toString().slice(0, -1);
            return newValue === "" ? "0" : newValue;
          } else if (digit === "Enter") {
            addSelectedItem();
            return "0"; 
          } else {
            return prevValue === "0" ? digit : prevValue + digit;
          }
        });

        setActiveButton(digit);

        setTimeout(() => setActiveButton(null), 200);
      }, 0);
    },
    [addSelectedItem] 
  );

  const handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      handleClick("Back Space");
    } else if (event.key === "Enter") {
      handleClick("Enter");
    } else if (!isNaN(event.key) || event.key === ".") {
      handleClick(event.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

 
  useEffect(() => {
    getAmount(parseFloat(value) || 0);
  }, [value, getAmount]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          gap: "10px",
          height: "18%",
        }}
      >
        <div
          style={{
            width: "30%",
            height: "100%",
            backgroundColor:
              activeButton === "Back Space" ? "#FF5722" : "#FF8336",
            color: "white",
            alignContent: "center",
            borderRadius: "4px",
            fontWeight: "600",
            fontSize: "12px",
          }}
          onClick={() => handleClick("Back Space")}
        >
          Back Space
        </div>
        <div
          style={{
            width: "30%",
            height: "100%",
            backgroundColor: activeButton === "-" ? "#333" : "#111314",
            color: "white",
            alignContent: "center",
            borderRadius: "4px",
            fontWeight: "700",
          }}
          onClick={() => handleClick("-")}
        >
          -
        </div>
        <div
          style={{
            width: "30%",
            height: "100%",
            backgroundColor: activeButton === "%" ? "#333" : "#111314",
            color: "white",
            alignContent: "center",
            borderRadius: "4px",
            fontWeight: "700",
          }}
          onClick={() => handleClick("%")}
        >
          %
        </div>
      </div>

      {[["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"], ["0", ".", "Enter"]].map(
        (row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              gap: "10px",
              height: "18%",
              marginTop: "10px",
            }}
          >
            {row.map((digit) => (
              <div
                key={digit}
                style={{
                  width: "30%",
                  height: "100%",
                  backgroundColor:
                    activeButton === digit
                      ? "#1CCED8"
                      : digit === "Enter"
                      ? "#1CCED8"
                      : "#111314",
                  color: "white",
                  alignContent: "center",
                  borderRadius: "4px",
                  fontWeight: "700",
                }}
                onClick={() => handleClick(digit)}
              >
                {digit}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default NumberPad;