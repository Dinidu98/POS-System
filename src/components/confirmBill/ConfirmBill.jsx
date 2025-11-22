import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LOGO from "../../assets/POS.png";

const ConfirmBill = ({ tableData = [], details }) => {
  const receiptRef = useRef(null);
  const [dateTime, setDateTime] = useState(new Date());
  const selectedPayMethod = useSelector(
    (state) => state.points.selectedPayMethod
  );
  const customerName=useSelector((state)=>state.points.customer)
  const [isReceiptVisible, setIsReceiptVisible] = useState(false);


  
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  const handlePrint = () => {
    const receipt = receiptRef.current;
    const printWindow = window.open("", "_blank", "width=600,height=800");
    printWindow.document.write(
      "<html><head><title>Receipt</title></head><body>"
    );
    printWindow.document.write(receipt.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const toggleReceiptVisibility = () => {
    setIsReceiptVisible(!isReceiptVisible);
  };

  useEffect(()=>{
    console.log(details, "ConfirmBill")
  },[])

  return (
    <div>
      <div
        ref={receiptRef}
        style={{
          display: isReceiptVisible ? "block" : "none",
          position: "absolute",
          top: "10%",
          right: "0%",
          zIndex: "1",
        }}
      >
        <div style={styles.receipt}>
          <img
            src={LOGO}
            style={{
              height: "60px",
            }}
            alt="notification Logo"
          />
          <p style={styles.address}>123 Main Street, City</p>
          <hr style={styles.hr} />
          <p style={styles.textSmall}>Date: {dateTime.toLocaleString()}</p>
          <hr style={styles.hr} />

          <table style={styles.table}>
            <thead>
              <tr>
              <th style={styles.thTd}>No</th>
                <th style={styles.thTd}>Item</th>
                <th style={{ ...styles.thTd, ...styles.rightAlign }}>Qty</th>
                <th style={{ ...styles.thTd, ...styles.rightAlign }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.thTd}>{index + 1}</td>
                    <td style={styles.thTd}>{item.itemName}</td>
                    <td style={{ ...styles.thTd, ...styles.rightAlign }}>
                      {item.quantity}
                    </td>
                    <td style={{ ...styles.thTd, ...styles.rightAlign }}>
                      Rs: {(item.amount * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <hr style={styles.hr} />
          <p style={styles.total}>Subtotal: Rs: {details.subtotal}</p>
          <p style={styles.tax}>
            Tax (10%): Rs: {((details.subtotal * 10) / 100).toFixed(2)}
          </p>
          <p style={styles.tax}>Discount: Rs: {details.totalDiscount.toFixed(2)}</p>
          <p style={styles.total}>
            Net Total: Rs:{" "}
            {(details.subtotal + (details.subtotal * 10) / 100 - details.totalDiscount).toFixed(
              2
            )}
          </p>
          <p style={styles.tax}>Balance: Rs: {details.balance.toFixed(2)}</p>

          <p style={{ textAlign: "center", fontSize: "12px" }}>
            Payment Method: {selectedPayMethod}
          </p>
          <hr style={styles.hr} />
          <p style={{ textAlign: "center", fontSize: "10px" }}>
            Thank you {customerName}!
          </p>
          <p style={{ textAlign: "center", fontSize: "10px" }}>
            Points earned : {details.redeemPoints}
          </p>
          <p style={{ textAlign: "center", fontSize: "10px" }}>
          WE ARE HAPPY TO EXCHANGE PRODUCTS RETURNED IN SALEABLE CONDITION, ALONG
          WITH RECEIPT
          </p>
        </div>
      </div>

      <button onClick={toggleReceiptVisibility} style={styles.button}>
        Show/Hide Receipt
      </button>
      {isReceiptVisible && (
        <button onClick={handlePrint} style={styles.button}>
          Confirm & Print Receipt
        </button>
      )}
    </div>
  );
};

const styles = {
  receipt: {
    padding: "16px",
    width: "320px",
    border: "1px solid black",
    backgroundColor: "white",
    fontFamily: "Arial, sans-serif",
  },
  title: { textAlign: "center", fontWeight: "bold", fontSize: "18px" },
  address: { textAlign: "center", fontSize: "12px" },
  hr: { margin: "8px 0", border: "1px solid black" },
  textSmall: { fontSize: "12px" },
  table: { width: "100%", fontSize: "12px", borderCollapse: "collapse" },
  thTd: { padding: "4px", textAlign: "left" },
  rightAlign: { textAlign: "right" },
  total: { fontWeight: "bold", textAlign: "left", fontSize: "14px" },
  tax: { textAlign: "left", fontSize: "12px" },
  button: {
    width: "100",
    margin: "10px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor:"#1CCED8"
  },
};

export default ConfirmBill;
