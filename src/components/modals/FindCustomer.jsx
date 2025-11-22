import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NumberPad from "../numberPad/NumberPad";
import { TextField, Button, FormLabel } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { fetchCustomers } from "../../slice/fetchSlice";
import { addCustomer } from "../../slice/modalSlice";



const FindCustomer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({ number: "" });
  const [formErrors, setFormErrors] = useState({ number: "" });
  const [points, setPoints] = useState("");
  const dispatch=useDispatch()
  const {items:customers,loading,error}=useSelector((state)=>state.items)

  useEffect(() => {
    dispatch(fetchCustomers());

    const handleKeyPress=(event)=>{
      // console.log("Key pressed:", event.key);
      if(event.key==="Escape"){
        handleOpen()
      }
    };
    window.addEventListener("keydown",handleKeyPress)

    return()=>{
      window.removeEventListener("keydown",handleKeyPress)
    }
  }, [dispatch]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : prevErrors[name],
    }));
  };

    useEffect(() => {
      setFormData((prev) => ({
        ...prev,
        number: points,
      }));
    }, [points]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (!formData.number) {
      setFormErrors({ number: "Number is required" });
      return;
    }
    
    const customer = customers.find((c) => c.number === formData.number);
    if (customer) {
      toast.success(`Customer Found: ${customer.customerName}`);
      dispatch(addCustomer(customer.customerName))
    } else {
      toast.error("Customer not found");
    }
    
    setFormData({ number: "" });
    setOpen(false);
  };


  return (
    <div style={{height:"100%"}}>
      <Box sx={styles.btn} onClick={handleOpen}>Find Customer</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Find Customer
            </Typography>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel style={{color:"white"}}>Mobile Number / Barcode</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  error={!!formErrors.number}
                  helperText={formErrors.number}
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
            <NumberPad getAmount={setPoints} addSelectedItem={handleSubmit} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
const styles = {
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
  btn: {
    width: "100%",
    height:"100%",
    backgroundColor: "#8C2EE5",
    borderRadius: "4px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor:"pointer",
    color:"white"
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
    backgroundColor: "#480489",
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

export default FindCustomer;
