import React, { useState } from "react";
import Header from "../components/header/Header";
import LeftSide from "../components/leftSide/LeftSide";
import ItemTable from "../components/table/Table";

const MainPage = () => {
  const [items, setItems] = useState([]);

  const handleGetItems = (newItems) => {
    setItems(newItems);
  };

  const onRemoveItem=(id)=>{
    setItems((prev)=>prev.filter((item)=>item.id!==id))
  }

  return (
    <div style={styles.main}>
      <Header />
      <div style={styles.content}>
        <div style={styles.rightSide}>
          <ItemTable items={items} onRemoveItem={onRemoveItem} />
        </div>
        <div style={styles.leftSide}>
          <LeftSide handleGetItems={handleGetItems} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  main: {
    height: "100vh",
    width: "100vw",
  },
  content: {
    display: "flex",
    height: "calc(100vh-80px)",
  },
  rightSide: {
    height:"88.5vh",
    width: "50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  leftSide: {
    height:"80vh",
    width: "50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
    // width: "100%",
    // height: "90vh",
  },
};

export default MainPage;
