import React, { useEffect, useMemo, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { addTotal } from "../../slice/modalSlice";
import { useDispatch } from "react-redux";
// import { resetPoints } from "../../slice/modalSlice";
import ConfirmBill from "../confirmBill/ConfirmBill";
import axios from "axios";
import { toast } from "react-toastify";

const TableSummary = ({ TableTotal, discount,items,tableData }) => {
  const selectedMethod = useSelector((state) => state.points.selectedPayMethod);
  const points=useSelector((state)=>state.points.data)
  const latestPoint = points.length > 0 ? points[points.length - 1].amount : 0; 
  const paymentState=useSelector((state)=>state.points.selectedPayMethod)
  const specialDiscount=useSelector((state)=>state.points.specialDiscount)
  const newBalance=useSelector((state)=>state.points.balance)
  const chargesAdd=useSelector((state)=>state.points.charges)
  const dispatch=useDispatch()
  const [details, setDetails] = useState({
    subtotal: 0,
    tax: 0,
    redeemPoints: 0,
    totalDiscount: 0,
    promotion: 0.0,
    total: 0,
    balance: 0,
    paymentMethod:null,
  });


  useEffect(() => {
    // const calculatedTax = total * (10 / 100);
    const calculatedTax = 0;
    const netTotal = TableTotal - discount + calculatedTax - specialDiscount  ;
    const totalCharges=chargesAdd.delivery + chargesAdd.packing + chargesAdd.service + chargesAdd.other
    const summaryTotal =totalCharges? netTotal-totalCharges:netTotal;

    setDetails((prev) => ({
      ...prev,
      subtotal: TableTotal,
      totalDiscount: discount,
      redeemPoints:latestPoint,
      tax: calculatedTax,
      total:totalCharges? netTotal-totalCharges:netTotal,
      paymentMethod:paymentState,
      balance:newBalance
    }));
    dispatch(addTotal(summaryTotal))
  
  }, [TableTotal, discount,latestPoint,paymentState,newBalance,specialDiscount,chargesAdd]);






  const summaryItems = [
    { label: "Subtotal", unit: "Rs", value: details.subtotal, bold: true },
    { label: "Tax", unit: "Rs", value: details.tax },
    { label: "Redeem Points", unit: "Points", value: details.redeemPoints },
    { label: "Discount", unit: "Rs", value: details.totalDiscount },
    specialDiscount ?  {label: "Special Discount", unit: "Rs", value: specialDiscount} :null,
    { label: "Promotion", unit: "Rs", value: details.promotion, spacing: true },
    chargesAdd.delivery ? {label: "Delivery Charge", unit:"Rs", value:chargesAdd.delivery}:null,
    chargesAdd.packing ? {label: "Packing Charge", unit:"Rs", value:chargesAdd.packing}:null,
    chargesAdd.service ? {label: "Service Charge", unit:"Rs", value:chargesAdd.service}:null,
    chargesAdd.other ? {label: "Other Charge", unit:"Rs", value:chargesAdd.other}:null,
    { label: "Net Total", unit: "Rs", value: details.total, bold: true },
    { label: "Balance", unit: "Rs", value: details.balance, bold: true },
  ].filter(item=>item !==null);

  const handleSubmit = async () => {

    if(!selectedMethod){
      toast.warning("Please select a payment method")
      return;
    }else if(items.length===0){
      toast.warning("Please Add Items")
      return;
    }
    
    const orderData = {
      cashAmount: selectedMethod, 
      totalDiscount: details.totalDiscount,
      grossAmount: details.subtotal,
      totalAmount: details.total,
      specialDiscount:specialDiscount,
      delivery:chargesAdd.delivery,
      packing:chargesAdd.packing,
      service:chargesAdd.service,
      other:chargesAdd.other,
      items: items.map((item) => ({
        product: item.ItemName,
        barcode: item.BarcodeNo,
        qty: parseFloat(item.quantity),
        unitPrice: parseFloat(item.Amount),
        discount: parseFloat(item.Discount) || 0,
        // description: item.description,
        // value: item.price * item.quantity - (item.discount || 0), 
      })),
    };
    console.log(orderData)
  
    try {
      
      const response = await axios.post('http://localhost:3000/orders', orderData);
      console.log('Order saved successfully:', response.data);
      
      setDetails({
        subtotal: 0,
        tax: 0,
        redeemPoints: 0,
        totalDiscount: 0,
        promotion: 0.0,
        total: 0,
        balance: 0,
        paymentMethod: null,
      });
      // items([]); 
  
      alert("Order Success");
      
      // Refresh the entire page (if necessary)
      // dispatch(resetPoints())
      setTimeout(() => window.location.reload(), 100);
  
      
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  
// console.log("special Discount",specialDiscount)
// console.log(typeof(chargesAdd.delivery),"from Table")

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        {/* Labels */}
        <Box sx={styles.column}>
          {summaryItems.map((item, index) => (
            <Typography
              key={index}
              sx={{
                ...styles.label,
                ...(item.bold && styles.bold),
                ...(item.spacing && styles.spacing),
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        {/* Units */}
        <Box sx={styles.column}>
          {summaryItems.map((item, index) => (
            <Typography
              key={index}
              sx={{ ...styles.label, ...(item.bold && styles.bold) }}
            >
              {item.unit}
            </Typography>
          ))}
        </Box>

        {/* Values */}
        <Box sx={styles.column} textAlign="right">
          {summaryItems.map((item, index) => (
            <Typography
              key={index}
              sx={{ ...styles.label, ...(item.bold && styles.bold) }}
            >
              {item.value}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box sx={styles.confirm} onClick={handleSubmit}>Confirm</Box>
      {/* <Box sx={styles.confirm}><ConfirmBill tableData={tableData} details={details}
      /></Box> */}
    </Box>
  );
};

const styles = {
  container: {
    backgroundColor: "#03A358",
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    height: "100%",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    paddingLeft:"20px"
  },
  column: {
    textAlign: "left",
  },
  label: {
    fontSize: "12px",
    
    marginBottom:"1px"
  },
  bold: {
    fontWeight: 600,
    fontSize: "16px",
  },
  spacing: {
    marginBottom: "10px",
  },
  confirm:{
    marginTop:"20px",
    height:"20%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderTop:"10px  solid #1A1C1F"
  }
};

export default TableSummary;
