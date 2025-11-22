import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NumberPadModal from "../numberPad/NumberPadModal";
import { TextField, FormLabel, Button } from "@mui/material";
import { toast } from "react-toastify";

const AddCustomer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(0);
    const [value4, setValue4] = useState(0);
    const [selected,setSelected]=useState("input1")
  const [formData, setFormData] = useState({
    customerBarcode: "",
    fullName: "",
    number: "",
    email: ""
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    number: "",
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

  useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        customerBarcode: value1,
        fullName: value2,
        number:value3,
        email:value4
      }));
    }, [value1, value2,value3, value4]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const errors = {};
    // if (!formData.fullName.trim()) errors.fullName = "Name is required";
    // if (!formData.number || formData.fullName <= 0) errors.amount = "Phone Number is required";
    console.log(formData)

    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        
        return; 
    }

    
    toast.success("Customer Added Successfully");
    

    
    setFormData({
        customerBarcode: "",
    fullName: "",
    number: "",
    email: ""
    });
    setOpen(false);
};

  return (
    <div style={{height:"100%"}}>
      <Box sx={styles.btn} onClick={handleOpen}> Add Customer</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h" component="h4">
              Add Customer
            </Typography>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel
                  style={{
                    color: "white",
                  }}
                >
                  Customer Barcode 
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id="customerBarcode"
                  name="customerBarcode"
                  autoComplete="customerBarcode"
                  value={formData.customerBarcode}
                  onChange={handleChange}
                  onFocus={()=>setSelected("input1")}
                  style={styles.input}
                  autoFocus
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
              <div style={styles.inputGrp}>
                <FormLabel
                  style={{
                    color: "white",
                  }}
                >
                  Full Name
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  name="fullName"
                  autoComplete="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={()=>setSelected("input2")}
                  error={!!formErrors.fullName}
                  helperText={formErrors.fullName}
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
                  Phone Number
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="number"
                  name="number"
                  autoComplete="number"
                  value={formData.number}
                  onFocus={()=>setSelected("input3")}
                  onChange={handleChange}
                  error={!!formErrors.number}
                  helperText={formErrors.number}
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
                  Email (Optional)
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={()=>setSelected("input4")}
                  style={styles.input}
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
            {/* </div> */}
          </Box>
          <Box style={styles.numberPad}>
            <NumberPadModal 
             getValue1={setValue1} 
             getValue2={setValue2}
             getValue3={setValue3}
             getValue4={setValue4}
            addSubmit={handleSubmit}
            selected={selected}
            />
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
    height: "50%",
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
    width: "80%",
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
};

export default AddCustomer;
