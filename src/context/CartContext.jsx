import { useContext } from "react";
import { createContext, useState } from "react";
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const clearCart = () => {
    setCart([]);
  };
  const removeOneFromCart = (itemId) => {
    setCart((prevCart) => {
      const item = prevCart.find((prod) => prod.id === itemId);
      if (!item) return prevCart;
  
      if (item.quantity === 1) {
        
        return prevCart.filter((prod) => prod.id !== itemId);
      } else {
        
        return prevCart.map((prod) =>
          prod.id === itemId ? { ...prod, quantity: prod.quantity - 1 } : prod
        );
      }
    });
  };
  
  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((prod) => prod.id === item.id);
      const currentQuantity = existingItem ? existingItem.quantity : 0;
      const newQuantity = currentQuantity + quantity;
  
      
      if (newQuantity > item.stock) {
        Swal.fire({
          icon: 'error',
          title: 'Stock insuficiente',
          text: `Solo hay ${item.stock} unidades disponibles de "${item.title}".`,
          confirmButtonColor: '#d33'
        });
        return prevCart;
      }
  
      if (existingItem) {
        return prevCart.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: newQuantity }
            : prod
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, removeOneFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
