import React,{useState} from "react";
import Box from '@mui/material/Box';
import CashIn from "../modals/cashIn";
import CashOut from "../modals/CashOut";
import Balance from "../modals/Balance";
import FindCustomer from "../modals/FindCustomer";
import Redeem from "../modals/Redeem";
import PromoCode from "../modals/PromoCode";
import { useDispatch } from "react-redux";
import { addEdit } from "../../slice/modalSlice";

const AddTwo = () => {

  const [edit,setEdit]=useState(true)
  const dispatch=useDispatch()

  const handleEdit=()=>{
    setEdit((prev)=>!prev)
    dispatch(addEdit(edit))
  }
  // console.log(edit)


  return (
    <>
      <Box sx={styles.row}>
        <Box sx={styles.btnDiv} ><FindCustomer/></Box>
        <Box sx={styles.btnDiv} ><Redeem/></Box>
      </Box>
      <Box sx={styles.row}>
        <Box sx={styles.btnDiv} ><PromoCode/></Box>
        <Box sx={{...styles.btn, backgroundColor:edit ?"#8C2EE5": "#3c1065"}} onClick={handleEdit}>Edit</Box>
      </Box>
      <Box sx={styles.row}>
        <Box sx={styles.btnDiv}><CashIn/></Box>
        <Box sx={styles.btnDiv}><CashOut/></Box>
      </Box>
      <Box sx={styles.rowLast}>
        <Box sx={styles.balanceDiv}><Balance/></Box>
      </Box>


     
    </>
  );
};

const styles = {
  row: {
    display: "flex",
    justifyContent: "center",
    gap:"1.5%",
    height: "30%",
    marginTop: "10px",
    paddingLeft:"10px",
    paddingRight:"10px"
  },
  btnDiv:{
    width:"80%",

  },
  btn: {
    width: "80%",
    backgroundColor: "#8C2EE5",
    borderRadius: "4px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor:"pointer",
    color:"white"
  },
  rowLast: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  balanceDiv:{
    width: "95%",
    height:"50px",
  },
};

export default AddTwo;
