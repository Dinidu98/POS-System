import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NumberPadModal from "../numberPad/NumberPadModal";
import { TextField, FormLabel, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCharges } from "../../slice/modalSlice";

const AddCharges = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch=useDispatch()
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [selected,setSelected]=useState("input1")
  const [formData, setFormData] = useState({
    delivery: 0,
    packing: 0,
    service: 0,
    other:0
  });
  const [formErrors, setFormErrors] = useState({
    delivery: "",
    packing: "",
    service: "",
    other:""
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
      delivery: value1,
      packing: value2,
      service:value3,
      other:value4
    }));
  }, [value1, value2,value3, value4]);

  const handleSubmit = async (e) => {
      dispatch(addCharges(formData))
    handleClose()
    toast.success("Charges Added")
  };





  return (
    <div style={{height:"100%"}} >
      <Box sx={styles.btn} onClick={handleOpen}>Add Charges</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h" component="h4">
              Add Charges
            </Typography>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel
                  style={{
                    color: "white",
                  }}
                >
                  Delivery Charges
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id="delivery"
                  name="delivery"
                  autoComplete="delivery"
                  value={formData.delivery}
                  onChange={handleChange}
                  error={!!formErrors.delivery}
                  helperText={formErrors.delivery}
                  style={styles.input}
                  onFocus={()=>setSelected("input1")}
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
                  Packing Charges
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id="packing"
                  name="packing"
                  autoComplete="packing"
                  value={formData.packing}
                  onChange={handleChange}
                  onFocus={()=>setSelected("input2")}
                  error={!!formErrors.packing}
                  helperText={formErrors.packing}
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
                  Service Charges
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="service"
                  name="service"
                  autoComplete="service"
                  value={formData.service}
                  onChange={handleChange}
                  error={!!formErrors.service}
                  helperText={formErrors.service}
                  onFocus={()=>setSelected("input3")}
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
                  Other Charges
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="other"
                  name="other"
                  autoComplete="other"
                  value={formData.other}
                  onChange={handleChange}
                  error={!!formErrors.other}
                  helperText={formErrors.other}
                  onFocus={()=>setSelected("input4")}
                  style={styles.input}
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
            </div>
            
            <div style={styles.btnRow}>
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
    width: "70%",
    height: "75%",
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
    height: "80%",
  },
  row: {
    gap: "10px",
    paddingTop: "20px",
  },
  btnRow: {
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

export default AddCharges;
