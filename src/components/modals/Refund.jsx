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

const Refund = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const [value3, setValue3] = useState(0);
    const [value4, setValue4] = useState(0);
    const [value5, setValue5] = useState(0);
      const [value6, setValue6] = useState(0);
      const [value7, setValue7] = useState(0);
      const [value8, setValue8] = useState(0);
      const [selected,setSelected]=useState("barcode")
  const [formData, setFormData] = useState({
    barcode: "",
    itemName: "",
    price: 0,
    quantity:0,
    invoiceNum:"",
    refundReason:"",
    purchaseDate:"",
    refundDate: new Date().toISOString().split("T")[0],
  });
  const [formErrors, setFormErrors] = useState({
    barcode: "",
    itemName: "",
    price: '',
    quantity:'',
    invoiceNum:"",
    refundReason:"",
    purchaseDate:"",
    refundDate:""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: (typeof value === "string" && value.trim()) ? "" : prevErrors[name],
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      barcode: value1,
    itemName: value2,
    price: value3,
    quantity:value4,
    invoiceNum:value5,
    refundReason:value6,
    purchaseDate:value7,
    refundDate:value8,
    }));
  }, [value1,value2,value3,value4,value5,value6,value7,value8]);

  const handleSubmit = async (e) => {
    // e.preventDefault(); 

    const errors = {};
    if (!formData.barcode.trim()) errors.barcode = "Barcode is required";
    if (!formData.itemName || formData.itemName <= 0) errors.itemName = "Item Name is required";
    if (!formData.price.trim()) errors.price = "price are required";
    if (!formData.quantity.trim()) errors.quantity = "quantity is required";
    if (!formData.invoiceNum || formData.invoiceNum <= 0) errors.invoiceNum = "invoiceNum is required";
    if (!formData.refundReason.trim()) errors.refundReason = "refundReason are required";
    if (!formData.purchaseDate || formData.purchaseDate <= 0) errors.purchaseDate = "purchase Date is required";
    if (!formData.refundDate.trim()) errors.refundDate = "Refund Date are required";

    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return; 
    }

    dispatch(addPoints(formData)); 
    toast.success("Refund Added");
    // console.log("Dispatched Data:", formData); 

    
    setFormData({
        barcode: "",
    itemName: "",
    price: 0,
    quantity:0,
    invoiceNum:"",
    refundReason:"",
    purchaseDate:"",
    refundDate: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
};

  return (
    <div style={{height:"100%"}}>
      <Box sx={styles.btn} onClick={handleOpen} >Add Refund</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.main}>
          <Box style={styles.form}>
            <Typography id="modal-modal-title" variant="h" component="h4">
              Refund
            </Typography>
            <div style={styles.row}>
              <div style={styles.inputGrp}>
                <FormLabel
                  style={{
                    color: "white",
                  }}
                >
                  Barcode
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="barcode"
                  name="barcode"
                  autoComplete="barcode"
                  value={formData.barcode}
                  onChange={handleChange}
                  error={!!formErrors.barcode}
                  helperText={formErrors.barcode}
                  onFocus={()=>setSelected("input1")}
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
                  Item Name
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="itemName"
                  name="itemName"
                  autoComplete="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  error={!!formErrors.itemName}
                  helperText={formErrors.itemName}
                  onFocus={()=>setSelected("input2")}
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
                  Price
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="price"
                  name="price"
                  autoComplete="price"
                  value={formData.price}
                  onChange={handleChange}
                  error={!!formErrors.price}
                  helperText={formErrors.price}
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
                  Quantity
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="quantity"
                  name="quantity"
                  autoComplete="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  error={!!formErrors.quantity}
                  helperText={formErrors.quantity}
                  onFocus={()=>setSelected("input4")}
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
                  Invoice Number
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="invoiceNum"
                  name="invoiceNum"
                  autoComplete="invoiceNum"
                  value={formData.invoiceNum}
                  onChange={handleChange}
                  error={!!formErrors.invoiceNum}
                  helperText={formErrors.invoiceNum}
                  onFocus={()=>setSelected("input5")}
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
                  Refund Reason
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="refundReason"
                  name="refundReason"
                  autoComplete="refundReason"
                  value={formData.refundReason}
                  onChange={handleChange}
                  error={!!formErrors.refundReason}
                  helperText={formErrors.refundReason}
                  onFocus={()=>setSelected("input6")}
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
                  Purchase Date
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id="purchaseDate"
                  name="purchaseDate"
                  autoComplete="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  error={!!formErrors.purchaseDate}
                  helperText={formErrors.purchaseDate}
                  onFocus={()=>setSelected("input7")}
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
                  Refund Date
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  id="refundDate"
                  name="refundDate"
                  autoComplete="refundDate"
                  value={formData.refundDate}
                  onChange={handleChange}
                  error={!!formErrors.refundDate}
                  helperText={formErrors.refundDate}
                  onFocus={()=>setSelected("input8")}
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
            
          </Box>
          <Box style={styles.numberPad}>
            <NumberPadModal 
            getValue1={setValue1} 
            getValue2={setValue2}
            getValue3={setValue3}
            getValue4={setValue4}
            getValue5={setValue5} 
             getValue6={setValue6}
             getValue7={setValue7}
             getValue8={setValue8}
             addSubmit={handleSubmit}
            selected={selected}/>
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
    width: "70%",
  },
  numberPad: {
    width: "30%",
    height: "70%",
  },
  row: {
    display: "flex",
    gap: "10px",
    paddingTop: "15px",
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

export default Refund;
