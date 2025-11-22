import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NumberPadModal from "../numberPad/NumberPadModal";
import { TextField, Button, FormLabel } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addDiscount } from "../../slice/modalSlice";



const Discount = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({ discount: "" });
  const [formErrors, setFormErrors] = useState({ discount: "" });
  const [points, setPoints] = useState(0);
  const dispatch=useDispatch()

  useEffect(() => {
      setFormData((prev) => ({
        ...prev,
        discount: points,
      }));
    }, [points]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : prevErrors[name],
    }));
  };

  const handleSubmit = (e) => {
    const sDiscount=parseInt(formData.discount,10)
    dispatch(addDiscount(sDiscount))
        handleClose()
        toast.success('Special Discount added');
  };


  return (
    <div style={{height:"100%"}}>
      <Box sx={styles.btn} onClick={handleOpen}>Special Discount</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Special Discount
            </Typography>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel style={{color:"white"}}>Discount</FormLabel>
                <TextField
                type="number"
                  required
                  fullWidth
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  error={!!formErrors.discount}
                  helperText={formErrors.discount}
                  style={styles.input}
                  autoFocus
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
              
            </div>
            
           
            
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <Button onClick={handleSubmit} style={styles.btnSubmit}>
                  Add
                </Button>
              </div>
              <div style={styles.inputGrp}>
                <Button onClick={handleClose} style={styles.btnCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
          <Box style={styles.numberPad}>
            <NumberPadModal getValue1={setPoints} addSubmit={handleSubmit} selected={"input1"}/>
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
    width: "60%",
    height: "40%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    backgroundColor: "#1A1C1F",
    p: 2,
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    borderRadius: "4px",
    textAlign: "center",
    color: "white",
  },

  form: {
    width: "60%",
  },
  numberPad: {
    width: "40%",
    height: "100%",
  },
  row: {
    display: "flex",
    gap: "10px",
    paddingTop: "20px",
  },
  inputGrp: {
    width: "100%",
    color: "white",
    textAlign: "left",
  },
  input: {
    border: "solid #ababad66 0.5px",
    borderRadius: "8px",
    marginTop: "10px",
    color: "white",
  },
  inputGrpNote: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    textAlign: "left",
    height: "20%",
  },

  btnSubmit: {
    backgroundColor: "#03A358",
    width: "100%",
    color: "white",
    height: "70px",
    borderRadius: "0px",
  },
  btnCancel: {
    backgroundColor: "#FF8336",
    width: "100%",
    color: "white",
    height: "70px",
    borderRadius: "0px",
    
  },
  balanceDiv:{
    textAlign:"left",
    backgroundColor:"#1CCED8",
    width:"100%",
    paddingLeft:"20px",
    borderRadius:"8px",
    color:"black"
  }
};

export default Discount;
