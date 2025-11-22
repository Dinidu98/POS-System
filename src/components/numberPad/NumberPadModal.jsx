import React, { useState, useEffect, useCallback } from "react";

const NumberPadModal = ({ addSubmit,selected, getValue1,getValue2,getValue3,getValue4,getValue5,getValue6,getValue7,getValue8, }) => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);
  const [value7, setValue7] = useState(0);
  const [value8, setValue8] = useState(0);
  const [activeButton, setActiveButton] = useState(null);


  const handleClick = useCallback(
    (digit) => {
      const handleDigitChange = (prevValue, setValue) => {
        if (digit === "Back Space") {
          const newValue = prevValue.toString().slice(0, -1);
          return newValue === "" ? "0" : newValue;
        } else if (digit === "Enter") {
          addSubmit();
          return "0";
        } else {
          return prevValue === "0" ? digit : prevValue + digit;
        }
      };
  
      const handleSelectedValue = () => {
        let setValue;
        if (selected === "input1" ) {
          setValue = setValue1; 
        } else if (selected === "input2") {
          setValue = setValue2; 
        } else if (selected === "input3") {
          setValue = setValue3; 
        } else if (selected === "input4") {
          setValue = setValue4; 
        }else if (selected === "input5") {
          setValue = setValue5; 
        } else if (selected === "input6") {
          setValue = setValue6; 
        } else if (selected === "input7") {
          setValue = setValue7; 
        }else if (selected === "input8") {
          setValue = setValue8; 
        }
  
        if (setValue) {
          setTimeout(() => {
            setValue((prevValue) => handleDigitChange(prevValue, setValue));
            setActiveButton(digit);
            setTimeout(() => setActiveButton(null), 200);
          }, 0);
        }
      };
  
      handleSelectedValue();
    },
    [addSubmit, selected]
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
    if (selected === "input1") {
      getValue1(parseFloat(value1) || 0);
    } else if (selected === "input2") {
      getValue2(parseFloat(value2) || 0);
    }else if (selected === "input3") {
      getValue3(parseFloat(value3) || 0);
    }else if (selected === "input4") {
      getValue4(parseFloat(value4) || 0);
    } else if (selected === "input5") {
      getValue5(parseFloat(value5) || 0);
    }else if (selected === "input6") {
      getValue6(parseFloat(value6) || 0);
    }else if (selected === "input7") {
      getValue7(parseFloat(value7) || 0);
    }else if (selected === "input8") {
      getValue8(parseFloat(value8) || 0);
    }

  }, [value1,value2,,value3,value4,value5,value6,value7,value8, selected]);

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

export default NumberPadModal;