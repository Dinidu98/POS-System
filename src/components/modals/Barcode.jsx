import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

const BarcodeGen = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [barcodeValue, setBarcodeValue] = useState("");
  const [count, setCount] = useState("");
  const [layout, setLayout] = useState("1-Up");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const uniqueBarcode = Math.floor(Math.random() * 100000000000);
      setBarcodeValue(uniqueBarcode.toString());
    }
  }, [open]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  

const handlePrint = () => {
  const numBarcodes = parseInt(count, 10);
  if (isNaN(numBarcodes) || numBarcodes <= 0) {
    toast.warning("Please enter count to print");
    return;
  }

  const barcodeContainer = document.getElementById("barcode-container");

  // Set barcode size based on the layout
  let barcodeWidth = 38; 
  let barcodeHeight = 25;

  if (layout === "2-Up") {
    barcodeWidth = 50;
  } else if (layout === "3-Up") {
    barcodeWidth = 34;
  }

  html2canvas(barcodeContainer, {
    useCORS: true,
    backgroundColor: "white",
  }).then((canvas) => {
    const barcodeImage = canvas.toDataURL("image/png");

    const barcodes = Array.from(
      { length: numBarcodes },
      (_, i) =>
        `<div style="display: inline-block; padding: 10px; text-align: center; width: ${barcodeWidth}mm; height: ${barcodeHeight}mm;">
          
          <img src="${barcodeImage}" alt="barcode" style="width: 100%; height: 100%;"/>
          
        </div>`
    );

    let columns = layout === "1-Up" ? 1 : layout === "2-Up" ? 2 : 3;
    let formattedBarcodes = "";
    for (let i = 0; i < barcodes.length; i += columns) {
      formattedBarcodes +=
        `<div style="display: flex; justify-content: center; gap: 10px;">` +
        barcodes.slice(i, i + columns).join("") +
        "</div>";
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<html><head><title>Barcode Print</title></head><body>${formattedBarcodes}</body></html>`
    );
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
    };
  });
};




const handleDownload = () => {
  const barcodeContainer = document.getElementById("barcode-container");

  
  html2canvas(barcodeContainer, {
    useCORS: true,
    backgroundColor: "white",
  }).then((canvas) => {
   
    const barcodeImage = canvas.toDataURL("image/png");

    
    const link = document.createElement("a");
    link.href = barcodeImage;
    link.download = `${productName}_barcode.png`; 

  
    link.click();
  });
};



  return (
    <div style={{height:"100%"}}>
      <Box sx={styles.btn} onClick={openModal}>Barcode Generate</Box>
      <Modal open={open} onClose={closeModal}>
        <Box sx={styles.main}>
          <Box sx={{ width: "55%" }}>
            <Typography variant="h6" style={{ color: "white" }}>
              Barcode Generator
            </Typography>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel style={{ color: "white" }}>Product Name</FormLabel>
                <TextField
                  fullWidth
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white",
                      border:"solid 1px white"
                    },
                  }}
                />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel style={{ color: "white" }}>Product Price</FormLabel>
                <TextField
                  fullWidth
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white",
                      border:"solid 1px white"
                    },
                  }}
                />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel style={{ color: "white" }}>Count</FormLabel>
                <TextField
                  fullWidth
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white",
                      border:"solid 1px white"
                    },
                  }}
                />
              </div>
            </div>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel style={{ color: "white" }}>Layout</FormLabel>
                <Select
                  fullWidth
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  style={{ color: "white" }}
                >
                  <MenuItem value="1-Up">1-Up</MenuItem>
                  <MenuItem value="2-Up">2-Up</MenuItem>
                  <MenuItem value="3-Up">3-Up</MenuItem>
                </Select>
              </div>
            </div>
            <Button
              variant="contained"
              onClick={handlePrint}
              sx={{ marginTop: 2,backgroundColor:"#480489" }}
            >
              PRINT
            </Button>
            <Button
              variant="contained"
              onClick={handleDownload}
              sx={{ marginTop: 2,marginLeft:"15px",backgroundColor:"#480489" }}
            >
              DOWNLOAD
            </Button>
            <Button
              variant="contained"
              onClick={closeModal}
              sx={{ marginTop: 2,marginLeft:"15px",backgroundColor:"#FF8336" }}
            >
              CANCEL
            </Button>
          </Box>
          <Box
            sx={{
              
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" style={{ color: "white" }}>
              Barcode Preview
            </Typography>
            <div
              id="barcode-container"
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold",color: "black" }}>
                {productName}
              </Typography>
              <Barcode
                id="barcode-image"
                value={barcodeValue || "000000"}
                displayValue={false}
              />
              <Typography variant="body2" sx={{ color: "black" }}>{barcodeValue}</Typography>
              <Typography variant="body2" sx={{ color: "black" }}>Rs {productPrice}</Typography>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

const styles = {
  btn: {
    width: "100%",
    height:"100%",
    backgroundColor: "#FFD447",
    borderRadius: "4px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontWeight: "bold",
  },
  main: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "60%",
    bgcolor: "#1A1C1F",
    p: 2,
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    borderRadius: "4px",
    textAlign: "center",
  },
  row: {
    display: "flex",
    gap: "10px",
    paddingTop: "20px",
  },
  inputGrp: {
    width: "100%",
    textAlign: "left",
  },
};

export default BarcodeGen;
