import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Cheque from "../modals/Cheque";
import { setPaymentMethod } from "../../slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Credit from "../modals/Credit";
import GiftVoucher from "../modals/GiftVoucher";
import Other from "../modals/Other";

const paymentMethods = ["Cheque", "Other", "Cash", "Card", "Credit", "Gift Voucher"];

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const selectedMethod = useSelector((state) => state.points.selectedPayMethod);
  const [currentIndex, setCurrentIndex] = useState(0);


  

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === "Control") {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % paymentMethods.length;
          dispatch(setPaymentMethod(paymentMethods[newIndex]));
          return newIndex;
        });
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch]);

  // console.log("Payment Method",selectedMethod)

  return (
    <>
      <Box sx={styles.container}>
        {paymentMethods.map((method, index) => (
          <Box
            key={method}
            sx={{
              ...styles.btn,
              backgroundColor: selectedMethod === method ? "#FF8336" : "#4B525C",
            }}
            onClick={() => dispatch(setPaymentMethod(method))}
          >
            {method === "Cheque" && <Cheque />}
            {method === "Other" && <Other />}
            {method === "Credit" && <Credit />}
            {method === "Gift Voucher" && <GiftVoucher />}
            {["Cash", "Card"].includes(method) && method}
          </Box>
        ))}
      </Box>
      <Box sx={styles.rowLast}>
        <Box sx={styles.balance} onClick={() => setTimeout(() => window.location.reload(), 100)}>
          Clear
        </Box>
      </Box>
    </>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "5px",
    rowGap: "0",
    justifyContent: "center",
    // marginTop: "10px",
    padding: "0 8px",
    height:"90%",
  },
  btn: {
    height: "64%",
    backgroundColor: "#4B525C",
    borderRadius: "4px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    padding: "10px",
  },
  rowLast: {
    display: "flex",
    justifyContent: "center",
    padding: "0 10px",
  },
  balance: {
    width: "100%",
    height:"50%",
    backgroundColor: "#FF8336",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    padding: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    // transition: "background 0.3s, transform 0.2s",
    // '&:hover': {
    //   backgroundColor: "#e6732f",
    //   transform: "scale(1.05)",
    // }
  },
};

export default PaymentMethod;
