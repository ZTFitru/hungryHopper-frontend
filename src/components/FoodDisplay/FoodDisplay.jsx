import "./FoodDisplay.css";
import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { FaSearch } from "react-icons/fa";
import FoodDetails from "../FoodDetails/FoodDetails";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  
  const searchToggle = () => {
    setIsSearching((prev) => !prev);
    setSearchQuery("");
  };

  const filteredFoodList = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShowDetails = (foodId) => {
    setSelectedFoodId(foodId);
  };

  const handleCloseDetails = () => {
    setSelectedFoodId(null);
  };

  if (selectedFoodId) {
    return <FoodDetails foodId={selectedFoodId} onClose={handleCloseDetails} />;
  }

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-header">
        <h3>{category}</h3>
        {isSearching ? (
          <input
            type="text"
            className="food-search-input"
            placeholder="Search food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        ) : (
          <FaSearch className="food-search-icon" onClick={searchToggle} />
        )}
      </div>
      <div className="food-display-list">
        {filteredFoodList.map((item) => (
          
            <FoodItem
              id={item._id}
              name={item.name}
              description={item.description}
              image={item.image}
              rating={item.rating}
            />

        ))}
      </div>
    </div>
  )
}

export default FoodDisplay;
