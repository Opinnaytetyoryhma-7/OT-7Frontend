import React, { useContext } from 'react';
import { CartContext } from '../Help/CartContext';
import '../styles/cart.css'; 

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch('https://chatbot-aniya.onrender.com/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity || 1, 
          }))
        ),
      });

      if (response.ok) {
        alert("Purchase successful!");
        clearCart(); 
      } else {
        const data = await response.json();
        alert("Purchase failed: " + data.detail);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    }
  };

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button onClick={() => removeFromCart(item)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <button className="checkoutbutton" onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
}

export default CartPage;