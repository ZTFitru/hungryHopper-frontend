import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function FoodItem({
  id,
  name,
  description,
  image,
  rating,
  onShowDetails,
}) {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

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
  };

  const isInCart = Boolean(cartItems[id]);

  const toggleCart = (e) => {
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  return (
    <div className="food-item">
      <div className="food-item-img-cont">
        <img
          className="food-item-img"
          src={url + "/images/" + image}
          alt={name}
        />
        <div className="favorite-icon" onClick={toggleCart}>
          {isInCart ? (
            <FaHeart className="heart-icon red" title="Remove from Favorites" />
          ) : (
            <FaRegHeart className="heart-icon white" title="Add to Favorites" />
          )}
        </div>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="food-item-stars">{renderStars(rating)}</div>
        </div>
        <p className="food-item-des">{description}</p>
        <Link to={`/food/${id}`} className="info-icon">
          <BsFillInfoSquareFill
            className="food-item-price"
            onClick={() => onShowDetails(id)}
          />
        </Link>
      </div>
    </div>
  );
}

export default FoodItem;
