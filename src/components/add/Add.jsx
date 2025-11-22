import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddPoints from "../modals/AddPoints";
import AddCharges from "../modals/ChargesModal";
import AddCustomer from "../modals/AddCustomer";
import Refund from "../modals/Refund";
import ARROW from "../../assets/arrow.png";
import BarcodeGen from "../modals/Barcode";
import PriceType from "../modals/PriceType";
import Discount from "../modals/Discount";

const Add = () => {
  const [defaultCard, setDefaultCard] = useState(true);

  const handleChangeOne = () => {
    setDefaultCard(false);
  };
  const handleChangeTwo = () => {
    setDefaultCard(true);
  };

  return (
    <>
      {defaultCard ? (
        <div style={{ height: "100%" }}>
          <Box sx={styles.row}>
            <Box sx={styles.btnDiv}><PriceType/></Box>
            <Box sx={styles.btnDiv}>
              <AddPoints />
            </Box>
          </Box>
          <Box sx={styles.row}>
            <Box sx={styles.btnDiv}>
              <Discount/>
            </Box>
            <Box sx={styles.btnDiv}>
              <AddCustomer />
            </Box>
          </Box>
          <Box sx={styles.row}>
            <Box sx={styles.btnDiv}>
              <AddCharges />
            </Box>
            <Box sx={styles.btnDiv}>
              <BarcodeGen />
            </Box>
          </Box>
        </div>
      ) : (
        <div style={{ height: "100%" }}>
          <Box sx={styles.row}>
            <Box sx={styles.btnDiv}><Refund /></Box>
            <Box sx={styles.btn}>
            Add Items
            </Box>
          </Box>
          <Box sx={styles.row1}>
            <Box style={{width:"100%"}} sx={styles.btn}>Installments</Box>
          </Box>
        </div>
      )}

      <Box sx={styles.rowLast}>
        <Box onClick={handleChangeTwo} sx={{...styles.arrow,backgroundColor: defaultCard ? "#888686":"#ffffff"}}>
          <img src={ARROW} alt="arrow" />
        </Box>
        <Box onClick={handleChangeOne} sx={{...styles.arrow,backgroundColor: defaultCard ? "#ffffff":"#888686"}}>
          <img style={styles.arrow2} src={ARROW} alt="arrow" />
        </Box>
      </Box>
    </>
  );
};

const styles = {
  
  row: {
    display: "flex",
    justifyContent: "center",
    gap:"1.5%",
    height: "30%",
    marginTop: "10px",
  },

  btnDiv:{
    width:"80%",

  },
  row1: {
    display: "flex",
    justifyContent: "start",
    height: "30%",
    marginTop: "10px",
  },
  btn: {
    width: "80%",
    backgroundColor: "#FFD447",
    borderRadius: "4px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: "bold",
  },
 
  rowLast: {
    display: "flex",
    justifyContent: "space-between",
    height: "20%",
    margin: "8px",
  },
  arrow: {
    width: "30%",
    height: "70%",
    backgroundColor: "#FFFFFF",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor:"pointer"
  },
  arrow2: {
    transform: "rotate(180deg)",
  },
};

export default Add;
