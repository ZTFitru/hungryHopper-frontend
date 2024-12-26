import React, { useContext, useState } from "react";
import "./FoodDetails.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { StoreContext } from "../../context/StoreContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { GrDirections } from "react-icons/gr";


const FoodDetails = ({rating}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodDetails, setFoodDetails] = useState(null);
  const { url } = useContext(StoreContext)

  const renderStars = (rating) => {
    const maxStar = 5;
    const stars = [];

    for (let i = 1; i <= maxStar; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color="ffb400" />);
      } else {
        stars.push(<FaRegStar key={i} color="ffb400" />);
      }
    }
    return stars;
  }


  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/food/${id}`)
        const data = await response.json()
        if (data.success) {
          setFoodDetails(data.data);
        } else {
          console.error("Failed to fetch food details");
        }
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  if (!foodDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="food-details">
      <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      <h2>{foodDetails.name}</h2>
      <img src={`${url}/images/${foodDetails.image}`} alt={foodDetails.name} />
      <p className="food-caption">{foodDetails.description}</p>
      <div className="food-item-stars">{renderStars(foodDetails.rating)}</div>
      <p> <IoMdTimer /> Prep Time: {foodDetails.prepTime} mins</p>
      <p> <IoMdTimer /> Cook Time: {foodDetails.cookTime} mins</p>
      <ul className="food-card">
        <h3>Ingredients:</h3>
        {foodDetails.ingredients.map((ingredient, index) => (
          <li key={index}>
            &#x2192; <span className="ingredient-name">{ingredient.name}</span> {ingredient.amount}
          </li>
        ))}
      </ul>
      <div className="food-directions">
        <h4> <GrDirections /> 
         Directions:</h4>
        <ol>
          {foodDetails.directions.map((direction, index) => (
            <li key={index}>{direction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default FoodDetails;