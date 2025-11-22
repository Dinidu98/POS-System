import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../slice/fetchSlice";
import { Box, Button } from "@mui/material";
import SEARCH from "../../assets/search.png";
import NumberPad from "../numberPad/NumberPad";
import Add from "../add/Add";
import AddTwo from "../add/AddTwo";
import PaymentMethod from "../add/PaymentMethod";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const LeftSide = ({ handleGetItems }) => {
  const [searchItem, setSearchItem] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const qtyInputRef = useRef(null);
  const searchInputRef = useRef(null);

  const debounceFetch = useCallback(
    debounce((value) => {
      if (value.trim() !== "") {
        dispatch(fetchItems(value));
      }
    }, 500),
    [dispatch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    debounceFetch(value);
    setHighlightedIndex(null);
  };

  const handleSelect = (item) => {
    setSelected(item);
    setSearchItem(item.ItemName);
    if (qtyInputRef.current) {
      qtyInputRef.current.focus();
    }
  };

  const addSelectedItem = () => {
    if (selected && quantity > 0) {
      const newItem = { ...selected, quantity };

      setSelectedItems((prevItems) => {
        const itemExists = prevItems.some((item) => item.id === newItem.id);

        if (itemExists) {
          const updatedItems = prevItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: newItem.quantity }
              : item
          );

          handleGetItems(updatedItems);
          return updatedItems;
        } else {
          const updatedItems = [...prevItems, newItem];
          handleGetItems(updatedItems);
          return updatedItems;
        }
      });

      setSelected("");
      setSearchItem("");
      setQuantity(0);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === filteredItems.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? filteredItems.length - 1
          : prevIndex - 1
      );
    } else if (e.key === "Enter" && highlightedIndex !== null) {
      const itemToSelect = filteredItems[highlightedIndex];
      handleSelect(itemToSelect);
    }
  };

  useEffect(() => {
    if (quantity === 0 && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [quantity]);

  const filteredItems =
    searchItem.trim() === ""
      ? []
      : items.filter(
          (item) =>
            item.ItemName?.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.BarcodeNo?.toLowerCase().includes(searchItem.toLowerCase())
        );

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={styles.searchBar}>
        <div
          style={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            padding: "10px 15px",
            borderRadius: "8px",
            backgroundColor: "#1A1C1F",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <img
            src={SEARCH}
            alt="search"
            style={{
              width: "22px",
              height: "22px",
              marginRight: "8px",
              cursor: "pointer",
            }}
          />

          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            value={searchItem}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: "0px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
              outline: "none",
              transition: "0.3s",
              backgroundColor: "#1A1C1F",
              color: "white",
            }}
            autoFocus
          />

          {loading && (
            <p style={{ marginLeft: "10px", fontSize: "14px", color: "#555" }}>
              Loading...
            </p>
          )}
          {error && (
            <p style={{ color: "red", fontSize: "14px", marginLeft: "10px" }}>
              {error}
            </p>
          )}
          {!loading && filteredItems.length === 0 && searchItem && !error && (
            <p
              style={{ fontSize: "14px", color: "#f3f1f1", marginLeft: "10px" }}
            >
              No items found.
            </p>
          )}

          {filteredItems.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "79%",
                left: 0,
                minWidth: "103.5%",
                backgroundColor: "#1A1C1F",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "0px 0px 5px 5px",
                overflow: "hidden",
                zIndex: 10,
                maxHeight: "300px",
                overflowY: "auto",
                border: "solid 1px #989797",
                borderTop: "none",
              }}
            >
              {filteredItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <p
                    
                    onClick={() => handleSelect(item)}
                    style={{
                      padding: "1px",
                      margin: 0,
                      cursor: "pointer",
                      backgroundColor:
                        index === highlightedIndex ? "#e0e0e0" : "transparent",
                      transition: "background 0.3s",
                      color: index === highlightedIndex ? "black" : "white",
                    }}
                  >
                    {item.ItemName}
                  </p>
                  <hr
                    style={{
                      backgroundColor: "#989797",
                      height: "1px",
                      border: "none",
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <div style={styles.btnDiv}>
          <button
            style={styles.btns}
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
          >
            -
          </button>
          <div style={{ flex: 2 }}>
            <input
              ref={qtyInputRef}
              type="text"
              onChange={(e) => setQuantity(Math.max(Number(e.target.value), 0))}
              placeholder={0}
              value={quantity > 0 && selected ? quantity : ""}
              style={styles.qtyInput}
            />
          </div>
          <button
            style={styles.btns}
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>
      <Box style={styles.addBtnDiv}>
        <div style={styles.rowWidth}>
          <Add />
        </div>

        <div style={styles.rowWidth}>
          <AddTwo />
        </div>
      </Box>

      <Box style={styles.addBtnDivBottom}>
        <div style={styles.rowWidth}>
          <PaymentMethod />
        </div>

        <div style={styles.rowWidth}>
          <NumberPad
            addSelectedItem={addSelectedItem}
            getAmount={setQuantity}
          />
        </div>
      </Box>
    </div>
  );
};

const styles = {
  searchBar: {
    color: "white",
    display: "flex",
    gap: "10px",
    width: "100%",
    height: "50px",
  },

  input: {
    width: "100%",
    height: "96%",
    border: "solid 0px",
    color: "white",
    backgroundColor: "#1A1C1F",
    paddingLeft: "10px",
  },

  itemList: {
    position: "absolute",
    top: "140px",
    marginLeft: "-15px",
    width: "34%",
    overflow: "auto",
    backgroundColor: "#1A1C1F",
    borderRadius: "1px",
    border: "solid 1px #a2a3a4",
    borderTop: "none",
  },

  btnDiv: {
    display: "flex",
    justifyContent: "space-between",
    width: "40%",
    padding: "5px",
  },

  btns: {
    backgroundColor: "#FFFFFF",
    color: "black",
    fontSize: "40px",
    flex: 1,
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyInput: {
    width: "100%",
    height: "96%",
    border: "solid 0px",
    color: "white",
    textAlign: "center",
    backgroundColor: "#1A1C1F",
  },

  addBtnDiv: {
    display: "flex",
    height: "38%",
  },
  addBtnDivBottom: {
    display: "flex",
    height: "45%",
    marginTop: "80px",
  },

  rowWidth: {
    width: "50%",
    height: "100%",
  },
};

export default LeftSide;
