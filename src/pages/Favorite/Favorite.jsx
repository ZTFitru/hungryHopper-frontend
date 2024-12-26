import React, { useContext } from 'react'
import './Favorite.css'
import { StoreContext } from '../../context/StoreContext'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


const Favorite = () => {

  const {cartItems, food_list, removeFromCart, url} = useContext(StoreContext)
  const navigate = useNavigate();

  return (
    <div className="favorites">
      <h1>Saved Recipes</h1>
      <div className="favorites-items">
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) { 
            return (
              <div key={item._id} className="favorite-item">
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <div className="favorite-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <button onClick={() => navigate(`/food/${item._id}`)}>View Recipe</button>
                </div>
                <IoMdClose
                  className="remove-icon"
                  onClick={() => removeFromCart(item._id)}
                  title="Remove from Favorites"
                />
              </div>
            );
          }
          return null;
        })}
        {Object.keys(cartItems).filter((id) => cartItems[id] > 0).length === 0 && (
          <p>No favorite recipes yet! Start adding some.</p>
        )}
      </div>
    </div>
  )
  }
  
export default Favorite;
