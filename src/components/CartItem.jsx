function CartItem({ item }) {
    return (
      <div>
        <h4>{item.title}</h4>
        <p>Precio: ${item.price}</p>
        <p>Cantidad: {item.quantity}</p>
        <p>Subtotal: ${item.price * item.quantity}</p>
      </div>
    );
  }
  
  export default CartItem;
  