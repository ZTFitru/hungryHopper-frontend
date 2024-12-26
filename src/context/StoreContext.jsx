import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=> {

    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:4000'
    const [token, setToken] = useState('')
    const [food_list, setFoodList] = useState([])

    //to add and remove from cart
    const addToCart = async (itemId)=> {
        if (!cartItems[itemId]) {
            setCartItems((prev)=> ({...prev,[itemId]: 1}))
        } else {
            setCartItems((prev)=> ({...prev,[itemId]: prev[itemId] + 1}))
        }
        if (token) {
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId)=> {
        setCartItems((prev)=> {
            const updatedCart = {...prev};
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });
        if (token) {
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = ()=> {
        let totalAmount = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            const itemInfo = food_list.find((product)=> product._id === item);
            if (itemInfo) { 
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
    }
    return totalAmount;
    }    

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url+'/api/food/list');
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Failed to fetch food list:", error);
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url+'/api/cart/get', {}, {headers: {token}});
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Failed to load cart data:", error);
        }
    }


    useEffect(()=> {
        const loadData = async () => {
            await fetchFoodList();
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        };
        loadData();
    }, [])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;