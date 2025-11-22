import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NumberPad from "../numberPad/NumberPad";
import { TextField, FormLabel, Button,Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cheque = () => {
  const selectedMethod = useSelector((state) => state.points.selectedPayMethod);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [points, setPoints] = useState(0);
  const [formData, setFormData] = useState({
    chequeNumber: "",
    date: new Date().toISOString().split("T")[0],
    bank: "",
  });
  const [formErrors, setFormErrors] = useState({
    chequeNumber: "",
    date: "",
    bank: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : prevErrors[name],
    }));
  };

  useEffect(()=>{
    if(selectedMethod === "Cheque"){
      handleOpen()
    }else{
      handleClose()
    }
  },[selectedMethod])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      chequeNumber: points,
    }));
  }, [points]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const errors = {};
    if (!formData.chequeNumber || typeof formData.chequeNumber !== 'number' || !String(formData.chequeNumber).trim()) {
      errors.chequeNumber = "Number is required";
  }
  if (!formData.date || formData.date <= 0) {
      errors.date = "Date is required";
  }
  if (!formData.bank || typeof formData.bank !== 'string' || !formData.bank.trim()) {
      errors.bank = "Bank required";
  }

    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return; 
    }

    console.log(formData)
    // dispatch(addPoints(formData)); 
    toast.success("Print Receipt");
    // console.log("Dispatched Data:", formData); 

    
    setFormData({
        chequeNumber: "",
        date: "",
        bank: "",
    });
    setOpen(false);
};

const banks = ["People's", "HNB", "BOC", "Sampath"];

  return (
    <div>
      <Box 
      onClick={handleOpen}
      >Cheque</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Cheque Payment
            </Typography>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel
                  style={{
                    color: "white",
                  }}
                >
                  Cheque Number
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="chequeNumber"
                  name="chequeNumber"
                  autoComplete="chequeNumber"
                  value={formData.chequeNumber}
                  onChange={handleChange}
                  error={!!formErrors.chequeNumber}
                  helperText={formErrors.chequeNumber}
                  style={styles.input}
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
              
            </div>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel
                  style={{
                    color: "white",
                  }}
                >
                  Date
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="date"
                  name="date"
                  autoComplete="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={!!formErrors.date}
                  helperText={formErrors.date}
                  style={styles.input}
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
              <div style={styles.inputGrp}>
                <FormLabel
                  style={{
                    color: "white",
                  }}
                >
                  Bank
                </FormLabel>
                <Select
                  required
                  fullWidth
                  id="bank"
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                  error={!!formErrors.bank}
                  displayEmpty
                  inputProps={{ style: { color: "white" } }}
                  style={styles.input}
                >
                  <MenuItem  value="" disabled>Select Bank</MenuItem>
                  {banks.map((bank, index) => (
                    <MenuItem key={index} value={bank}style={{backgroundColor:"#1A1C1F",color:"white"}}>
                      {bank}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.bank && (
                  <Typography variant="body2" color="error">
                    {formErrors.bank}
                  </Typography>
                )}
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
            {/* </div> */}
          </Box>
          <Box style={styles.numberPad}>
            <NumberPad getAmount={setPoints}  addSelectedItem={handleSubmit}  />
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
    height: "45%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    backgroundColor: "#1A1C1F",
    p: 2,
    display: "flex",
    justifyContent: "space-between",
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
    paddingTop: "10px",
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

  textArea: {
    border: "solid #ababad66 0.5px",
    borderRadius: "8px",
    marginTop: "10px",
    color: "white",
    backgroundColor: "black",
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
};

export default Cheque;
