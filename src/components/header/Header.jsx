import React, { useEffect, useState } from 'react'
import LOGO from '../../assets/Logo.png';
import Typography from '@mui/material/Typography';
import BELL from '../../assets/notifications.png'
import { useSelector } from 'react-redux';

const Header = () => {
    const [cashierName,setCashierName]=useState("Cashier Name")
    const customerName=useSelector((state)=>state.points.customer)
    const [dateTime,setDateTime]=useState(new Date())

    useEffect(()=>{
        const timer=setInterval(()=>{
            setDateTime(new Date())
        },1000)

    },[])


  return (
    
    <div style={{
        backgroundColor:"#480489",
        color:"white",
        height:'80px',
        display:"flex",
        alignItems:"center"
    }}>
        <div style={{
            width:"50%",
            paddingLeft:"14px",
            textAlign:"left",
        }}>
            <img src={LOGO} alt='logo'/>
        </div>

        <div style={{
            width:"25%",
            textAlign:"left"
        }}>
            <Typography>Cashier <span style={{marginLeft:"25px"}}>: {cashierName}</span></Typography>
            <Typography>Customer <span style={{marginLeft:"12px"}}>: {customerName}</span></Typography>
        </div>

        <div style={{
            width:"25%",
            textAlign:"right",
            paddingRight:"14px",
            display:"flex",
            justifyContent:"end",
            gap:"40px",
        }}>
            <div style={{
                textAlign:"left"
            }}>
            <Typography>{dateTime.toLocaleTimeString()}</Typography>
            <Typography>{dateTime.toLocaleDateString()}</Typography>
            </div>
            <div style={{
                display:"flex",
                alignItems:"center",
                gap:"10px"
            }}>
                <img src={BELL} alt='notification Logo'/>
                <Typography>LogOut</Typography>
            </div>
        </div>
    </div>
  )
}

export default Header
