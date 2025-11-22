import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NumberPadModal from "../numberPad/NumberPadModal";
import { TextField, FormLabel, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addPoints } from "../../slice/modalSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

const AddPoints = () => {
  const dispatch = useDispatch();
  const customerName=useSelector((state)=>state.points.customer)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [points, setPoints] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    amount: "",
    // note: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString(),
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    amount: "",
    // note: "",
  });

  

  const handleChange = (event) => {
    const { name, value } = event.target;

    let validatedValue = value;
    if (name === "name" || name==="note") {
      validatedValue = value.replace(/[^a-zA-Z\s]/g, ''); 
    } else if (name === "amount") {
        validatedValue = value.replace(/[^0-9]/g, ''); 

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
      name:customerName
    }));
  }, [points,customerName]);

  const handleSubmit = async (e) => {
    // e.preventDefault(); 

    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.amount || formData.amount <= 0) errors.amount = "Valid amount is required";
    // if (!formData.note.trim()) errors.note = "Notes are required";

    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return; 
    }

    dispatch(addPoints(formData)); 
    toast.success("Point Added Successfully");
    // console.log("Dispatched Data:", formData); 

    
    setFormData({
        name: "",
        amount: "",
        note: "",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString(),
    });
    setOpen(false);
};

  return (
    <div style={{height:"100%"}}>
      <Box sx={styles.btn} onClick={handleOpen} >Add Points</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h" component="h4">
              Add Points
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
                  Time
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id="time"
                  name="time"
                  autoComplete="time"
                  value={formData.time}
                  onChange={handleChange}
                  error={!!formErrors.time}
                  helperText={formErrors.time}
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
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
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
            {/* <div style={styles.inputGrpNote}>
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
                id="note"
                name="note"
                autoComplete="note"
                value={formData.note}
                onChange={handleChange}
                style={styles.textArea}
              />
              {formErrors.note && (
                <span style={{ color: "red" }}>{formErrors.note}</span>
              )}
            </div> */}
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
            <NumberPadModal getValue1={setPoints}addSubmit={handleSubmit} />
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
    width: "70%",
    height: "55%",
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
    width: "70%",
  },
  numberPad: {
    width: "30%",
    height: "70%",
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

export default AddPoints;
