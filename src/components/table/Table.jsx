import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TableSummary from '../tableSummary/TableSummary';
import { useSelector } from 'react-redux';
import REMOVE_IMG from '../../assets/removeBtn.png'

const columns = [
  { id: 'no', label: 'No', minWidth: "5%", align: 'left' },
  { id: 'itemName', label: 'Item Name', minWidth: "40%",align: 'left' },
  { id: 'price', label: 'Price', minWidth: "10%", align: 'right' },
  { id: 'quantity', label: 'Qty', minWidth: "10%", align: 'right' },
  { id: 'discount', label: 'Disc', minWidth: "10%", align: 'right' },
  {id:"total", label: 'Amount', minWidth: "10%", align: 'right'},
  {id:"remove",label:"",minWidth: "10%", align: 'center'}
  
];

function ItemTable({ items,onRemoveItem }) {
  const wholePrice=useSelector((state)=>state.points.wholePrice)
  const editUpdate=useSelector((state)=>state.points.edit)
  const tableData = useMemo(() =>
    items.map((item,index) => ({
      no: index + 1,
      itemName: item.ItemName,
      quantity: item.quantity,
      discount: item.Discount* item.quantity,
      // price: item.Amount,
      price: wholePrice ? item.WholePrice :item.Amount,
      total: wholePrice ? item.WholePrice * item.quantity : item.Amount * item.quantity,
      remove: item.id 
    }))
    , [items,wholePrice]);

  const totalAmount = useMemo(() =>
    items.reduce((acc, item) => acc + (wholePrice ? item.WholePrice * item.quantity : item.Amount * item.quantity || 0), 0)
  );

  const totalDiscount = useMemo(() =>
    items.reduce((acc, item) => acc + (item.Discount* item.quantity || 0), 0)
  );

  // console.log(wholePrice,"priceType")
  // console.log(editUpdate,"edit pressed")

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: "100%" }}>
      {/*Table*/ }
      <Box sx={{ width: '100%',height: '100%', overflow: 'hidden',flexGrow: 1  }}>
        
        <Box sx={{ display: 'flex', backgroundColor: '#111314',color:"white", padding: '10px', borderBottom: '1px solid #ddd',fontSize:"14px" }}>
          {columns.map((column) => (
            <Box key={column.id} sx={{ flex: column.minWidth, fontWeight: 'bold' }}>
              {column.label}
            </Box>
          ))}
        </Box>

        
        <Box sx={{maxHeight: '250px', overflowY: 'auto' 
        }}>
          {tableData.length > 0 ? (
            tableData.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', padding: '10px', borderBottom: '1px solid #ddd',color:"white",fontSize:"12px" }}>
                {columns.map((column) => {
                  if(column.id==='remove'){
                    return(
                      <Box key={column.id} sx={{flex:column.minWidth,textAlign:"center"}}>
                        {editUpdate ? <img style={{width:"25px",marginTop:"-5px"}} src={REMOVE_IMG} alt="image" onClick={() => onRemoveItem(item.remove)}/> :null}
                        
                      </Box>
                    )
                  }
                  const value = item[column.id];
                  return (
                    <Box key={column.id} sx={{ flex: column.minWidth }}>
                      {value}
                    </Box>
                  );
                })}
              </Box>
            ))
          ) : (
            <></>
          )}
        </Box>
      </Box>

      {/* Summary */}
      <Box sx={{  height: '100%' }}>
        <TableSummary TableTotal={totalAmount} discount={totalDiscount} items={items} tableData={tableData} />
      </Box>
    </Box>
  );
}

export default ItemTable;
