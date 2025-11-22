import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { addWholePrice } from "../../slice/modalSlice";
import { toast } from "react-toastify";

const PriceType = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [priceType,setPriceType]=useState(false)
   const dispatch = useDispatch();


   useEffect(()=>{
    dispatch(addWholePrice(priceType)); 
   },[priceType, dispatch])


   

   const handleWholesale=()=>{
    setPriceType(true)
    handleClose()
    toast.success('Wholesale Price added');
   }
   const handleRetail=()=>{
    setPriceType(false)
    handleClose()
    toast.success('Retail Price added');
   }
  

  return (
    <div style={{height:"100%"}}>
      <Box sx={styles.btnn} onClick={handleOpen}>Price Type</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
            <div style={styles.header}><h2>Price Type</h2></div>
         
          
          <div style={styles.btnDiv}>
            <div onClick={handleWholesale} style={styles.btn}> <h3>Wholesale<br/> Price</h3></div>
            <div onClick={handleRetail} style={styles.btn}> <h3>Retail<br/> Price</h3></div>
            </div>
        </Box>
      </Modal>
    </div>
  );
};
const styles = {
  btnn: {
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
    width: "50%",
    // height: "30%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    backgroundColor: "#1A1C1F",
    p: 2,
    display: "flex",
    flexDirection:"column",
    justifyContent: "start",
    alignItems:"center",
    gap: "10px",
    borderRadius: "4px",
    textAlign: "center",
    color: "white",
  },
  btnDiv:{
    display:"flex",
    justifyContent:"space-between",
    width:"100%"
  },
  btn:{
    backgroundColor:"#03A358",
    width:"49%",
    height:"100%",
    borderRadius:"3px",
    textAlign:"center",
    display:"flex",
    justifyContent:"center",
  }

};

export default PriceType;
