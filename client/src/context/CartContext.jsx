

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ ADD / INCREASE / DECREASE
  const addToCart = (product, qtyChange = 1) => {
    const exist = cart.find(x => x._id === product._id);

    if (exist) {
      const updatedCart = cart
        .map(x =>
          x._id === product._id
            ? { ...x, qty: x.qty + qtyChange }
            : x
        )
        .filter(x => x.qty > 0); // remove if qty 0

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ❌ REMOVE
  const removeFromCart = (id) => {
    setCart(cart.filter(x => x._id !== id));
  };

  // 🧮 TOTAL ITEMS (for navbar badge)
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        totalItems ,// 👈 IMPORTANT
          setCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};