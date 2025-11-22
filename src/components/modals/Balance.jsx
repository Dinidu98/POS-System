import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NumberPad from "../numberPad/NumberPad";
import { TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addBalance } from "../../slice/modalSlice";


const Balance = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [points, setPoints] = useState(0);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    amount: "",
  });
  const [formErrors, setFormErrors] = useState({
    amount: "",
  });

  const total = useSelector((state) => state.points.totalAmount);

  const [outStanding, setOutStanding] = useState(0);

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

    const calculatedOutstanding = parseFloat(value || 0) - total;
    setOutStanding(calculatedOutstanding);
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amount: points,
    }));
    const calculatedOutstanding = points - total;
    setOutStanding(calculatedOutstanding);
  }, [points, total]);

  const handleSubmit = async (e) => {
    // e.preventDefault(); 

    const errors = {};
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      errors.amount = "Valid amount is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; 
    }

    const calculatedOutstanding = formData.amount - total;
    setOutStanding(calculatedOutstanding);

    toast.success("Balance Added");
    setFormData({
      amount: "",
    });
    setOpen(false);

    // Dispatch after successful form submission
    dispatch(addBalance(calculatedOutstanding));
  };

  return (
    <div style={{height:"100%"}}>
      <Box sx={styles.balance}  onClick={handleOpen}>Balance</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Balance
            </Typography>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <TextField
                  required
                  fullWidth
                  id="amount"
                  name="amount"
                  autoComplete="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  error={!!formErrors.amount}
                  helperText={formErrors.amount}
                  style={styles.input}
                  autoFocus
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
            </div>
            <div style={styles.row}>
              <Box style={styles.balanceDiv}>
                <h4>Total Bill Amount : Rs  {total}</h4>
                <h4>Outstanding Amount : Rs  {outStanding}</h4>
              </Box>
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
            <NumberPad getAmount={setPoints}  addSelectedItem={handleSubmit}/>
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
    width: "50%",
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
  balance: {
    width: "100%",
    height:"100%",
    backgroundColor: "#8C2EE5",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
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
  balanceDiv: {
    textAlign: "left",
    backgroundColor: "#1CCED8",
    width: "100%",
    paddingLeft: "20px",
    borderRadius: "8px",
    color: "black",
  },
};

export default Balance;
