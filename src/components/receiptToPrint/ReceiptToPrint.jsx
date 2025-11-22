import React, { forwardRef } from "react";

const ReceiptToPrint = forwardRef((props, ref) => {
  const { shopName, shopAddress, shopTelephone, invoiceNo, receiptData, logoUrl } =
    props;

  const safeNumber = (value) => {
    return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
  };

  const items = receiptData?.items || [];
  const totalAmount = safeNumber(receiptData?.totalAmount);
  const cashAmount = safeNumber(receiptData?.cashAmount);
  const totalDiscount = safeNumber(receiptData?.totalDiscount);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: "monospace",
        width: "56mm",
        padding: "10px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginBottom: "10px"
      }}>
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Company Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
        )}
        <h2 style={{ fontSize: "16px", margin: 0 }}>{shopName || "Shop Name"}</h2>
      </div>
      <p style={{ fontSize: "12px", textAlign: "center" }}>{shopAddress || "Shop Address"}</p>
      <p style={{ fontSize: "12px", textAlign: "center" }}>
        TEL - {shopTelephone || "Shop Telephone"}
      </p>
      <p style={{ fontSize: "9px", display: "flex", justifyContent: "space-between" }}>
        <span>CASHIER: CASHIER</span>
        <span>START TIME: {new Date().toLocaleTimeString("en-US", { hour12: false })}</span>
      </p>

      <p style={{ fontSize: "9px", display: "flex", justifyContent: "space-between" }}>
        <span>UNIT NO: 1</span>
        <span>INVOICE NO: {invoiceNo || "N/A"}</span>
      </p>

      <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #000", padding: "2px 0" }}>Item</th>
            <th style={{ textAlign: "right", borderBottom: "1px solid #000", padding: "2px 0" }}>QTY</th>
            <th style={{ textAlign: "right", borderBottom: "1px solid #000", padding: "2px 0" }}>U/PRI</th>
            <th style={{ textAlign: "right", borderBottom: "1px solid #000", padding: "2px 0" }}>VAL</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <React.Fragment key={item.barcode || index}>
              <tr>
                <td colSpan="4" style={{ textTransform: "uppercase", textAlign: "left", padding: "2px 0" }}>{item.product || "N/A"}</td>
              </tr>
              <tr>
                <td></td>
                <td style={{ textAlign: "right", padding: "2px 0" }}>{item.qty || "0"}</td>
                <td style={{ textAlign: "right", padding: "2px 0" }}>{safeNumber(item.unitPrice).toFixed(2)}</td>
                <td style={{ textAlign: "right", padding: "2px 0" }}>{safeNumber(item.value).toFixed(2)}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <hr />
      <p
        style={{
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>***SUB TOTAL***</span>
        <span>{totalAmount.toFixed(2)}</span>
      </p>
      <hr />
      <p
        style={{
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>CASH</span>
        <span>{cashAmount.toFixed(2)}</span>
      </p>
      <p
        style={{
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>BALANCE</span>
        <span>{(cashAmount - totalAmount).toFixed(2)}</span>
      </p>
      <p
        style={{
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>NO OF PIECES</span>
        <span>
          {items.reduce((sum, item) => sum + safeNumber(item.qty), 0)}
        </span>
      </p>
      <p
        style={{
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>NO OF PRODUCTS</span>
        <span>{items.length}</span>
      </p>
      <p
        style={{
          fontSize: "9px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>DATE: {new Date().toLocaleDateString("en-GB")}</span>
        <span>
          END TIME: {new Date().toLocaleTimeString("en-US", { hour12: false })}
        </span>
      </p>

      <div
        style={{
          border: "2px solid black",
          padding: "2px",
          marginTop: "10px",
          fontSize: "10px",
        }}
      >
        <p style={{ textAlign: "center" }}>YOU HAVE TOTAL DISCOUNT</p>
        <p style={{ textAlign: "center" }}>{totalDiscount.toFixed(2)}</p>
      </div>
      <p style={{ fontSize: "10px", textAlign: "center" }}>
        WE ARE HAPPY TO EXCHANGE PRODUCTS RETURNED IN SALEABLE CONDITION, ALONG
        WITH RECEIPT
      </p>
      <p style={{ fontSize: "10px", textAlign: "center" }}>
        THANK YOU COME AGAIN
      </p>
      <p style={{ fontSize: "10px", textAlign: "center" }}>
        Powered by: Cirecle Company Ltd | www.usecireclepos.com | 0113503505
      </p>
    </div>
  );
});

ReceiptToPrint.displayName = "ReceiptToPrint";

export { ReceiptToPrint };



