import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
   

  function handleAddItem(newItem) {
    console.log("In ShoppingList:", newItem);
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }
  //use effect
  useEffect (()=> {
    fetch("http://localhost:4000/items")
    .then (response => response.json())
    .then((items) => setItems(items))
  }, [])
  function handleUpdateItem(updatedItem) {
  const updatedItems = items.map((item) => {
    if (item.id === updatedItem.id) {
      return updatedItem;
    } else {
      return item;
    }
  });
  setItems(updatedItems);
  }
  
  function handleDeleteItem(deletedItem) {
  const updatedItems = items.filter((item) => item.id !== deletedItem.id);
  setItems(updatedItems);
}

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item}  onUpdateItem={handleUpdateItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
