import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NumberPad from "../numberPad/NumberPad";
import { TextField, Button, FormLabel,Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Other = () => {
  const selectedMethod = useSelector((state) => state.points.selectedPayMethod);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [points, setPoints] = useState("");
  const [formData, setFormData] = useState({
    method: "",
  });
  const [formErrors, setFormErrors] = useState({
    method: "",
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
      if(selectedMethod === "Other"){
        handleOpen()
      }else{
        handleClose()
      }
    },[selectedMethod])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      method: points,
    }));
  }, [points]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const errors = {};
    if (!formData.method || formData.method <= 0) errors.method = "method is required";
    console.log(formData)
    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return; 
    }
   
    toast.success("Create Receipt");
    setFormData({
        method: "",
    });
    setOpen(false);
};

const methods = ["Koko Pay", "Mint Pay", "Payzy"];


  return (
    <div>
      <Box onClick={handleOpen}>Other</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Other Payment Method
            </Typography>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel style={{color:"white"}}>Payment Method</FormLabel>
                <Select
                  required
                  fullWidth
                  id="method"
                  name="method"
                  autoComplete="method"
                  value={formData.method}
                  onChange={handleChange}
                  error={!!formErrors.method}
                  helperText={formErrors.method}
                  style={styles.input}
                  InputProps={{ style: { color: "white" } }}
                >
                <MenuItem value="" disabled>Select Payment Method</MenuItem>
             {methods.map((method, index) => (
                                 <MenuItem key={index} value={method}style={{backgroundColor:"#1A1C1F",color:"white"}}>
                                   {method}
                                 </MenuItem>
                               ))}
                               </Select>
                               {formErrors.method && (
                  <Typography variant="body2" color="error">
                    {formErrors.method}
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
          </Box>
          <Box style={styles.numberPad}>
            <NumberPad getAmount={setPoints}addSelectedItem={handleSubmit} />
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

export default Other;
