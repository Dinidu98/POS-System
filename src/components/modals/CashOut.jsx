import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NumberPad from "../numberPad/NumberPad";
import { TextField, FormLabel, Button } from "@mui/material";
import {CASH_OUT} from "../../api"
import axios from "axios";
import { toast } from "react-toastify";

const CashIn = () => {
//   const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [points, setPoints] = useState(0);
  const [formData, setFormData] = useState({
    cashInName: "",
    amount: 0,
    cashInNote: "",
    cashInDate: new Date().toISOString().split("T")[0],
    cashInTime: new Date().toLocaleTimeString(),
  });
  const [formErrors, setFormErrors] = useState({
    cashInName: "",
    amount: "",
    cashInNote: "",
    cashInDate: "",
    cashInTime:"",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    let validatedValue = value;
    if (name === "cashInName" || name==="cashInNote") {
      validatedValue = value.replace(/[^a-zA-Z\s]/g, ''); // Only allow letters and spaces
    } else if (name === "amount") {
        validatedValue = value.replace(/[^0-9]/g, ''); //only allow numbers

    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: validatedValue,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validatedValue.trim() ? "" : prevErrors[name],
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amount: points,
    }));
  }, [points]);

  const handleSubmit = async (e) => {
    // e.preventDefault()

    const errors = {};
    if (!formData.cashInName) errors.cashInName = "Name is required";
    if (!formData.amount) errors.amount = "Amount is required";
    if (!formData.cashInNote) errors.cashInNote = "cashInNotes are required";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
        
        const response = await axios.post(CASH_OUT, formData);
        
        
        toast.success('Cash Out successfully added');
        console.log(response.data);
        
       
        setFormData({
          cashInName: "",
          amount: 0,
            cashInNote: "",
            cashInDate: new Date().toISOString().split("T")[0],
            cashInTime: new Date().toLocaleTimeString(),
        });
        handleClose(); 
    } catch (error) {
        
        toast.error('An error occurred while adding data');
        console.error(error);
    }
  };

  return (
    <div style={{height:"100%"}}>
      <Box sx={styles.btn} onClick={handleOpen}>Cash Out</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Cash Out
            </Typography>
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
                  id="cashInDate"
                  name="cashInDate"
                  autoComplete="cashInDate"
                  value={formData.cashInDate}
                  onChange={handleChange}
                  error={!!formErrors.cashInDate}
                  helperText={formErrors.cashInDate}
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
                  Time
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id="cashInTime"
                  name="cashInTime"
                  autoComplete="cashInTime"
                  value={formData.cashInTime}
                  onChange={handleChange}
                  error={!!formErrors.cashInTime}
                  helperText={formErrors.cashInTime}
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
                  Name
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="cashInName"
                  name="cashInName"
                  autoComplete="cashInName"
                  value={formData.cashInName}
                  onChange={handleChange}
                  error={!!formErrors.cashInName}
                  helperText={formErrors.cashInName}
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
                  Amount
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="amount"
                  name="amount"
                  autoComplete="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  error={!!formErrors.amount}
                  helperText={formErrors.amount}
                  style={styles.input}
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
            </div>
            {/* <div style={styles.row}> */}
            <div style={styles.inputGrpNote}>
              <FormLabel
                style={{
                  color: "white",
                }}
              >
                Notes
              </FormLabel>
              <textarea
                required
                autoFocus
                id="cashInNote"
                name="cashInNote"
                autoComplete="cashInNote"
                value={formData.cashInNote}
                onChange={handleChange}
                style={styles.textArea}
              />
              {formErrors.cashInNote && (
                <span style={{ color: "red" }}>{formErrors.cashInNote}</span>
              )}
            </div>
            <div style={{
                textAlign:"left",

            }}>
                <h4>Total Sales Of The Day: 300</h4>
                <h4>Available Cash Balance: 300</h4>
                <h4>Auto Date & Time: 300</h4>
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
            <NumberPad getAmount={setPoints} addSelectedItem={handleSubmit}/>
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
    width: "70%",
    height: "85%",
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
    backgroundColor: "#0064D7",
    borderRadius: "4px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor:"pointer",
    color:"white"
  },

  form: {
    width: "70%",
  },
  numberPad: {
    width: "30%",
    height: "60%",
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
    color: "white",
  },
  inputGrpNote: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    textAlign: "left",
    height: "20%",
  },

  textArea: {
    border: "solid #ababad66 0.5px",
    borderRadius: "8px",
    marginTop: "10px",
    color: "white",
    backgroundColor: "#1A1C1F",
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

export default CashIn;
