import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, addToCart, removeOneFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navigate = useNavigate();

const handleConfirm = () => {
  navigate('/checkout');
};

    const handleClear = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: "Esto eliminará todos los productos del carrito.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, vaciar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            clearCart();
            Swal.fire({
              title: 'Carrito vaciado',
              text: 'Tu carrito fue eliminado correctamente.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              toast: true,
              position: 'top-end',
            });
          }
        });
      };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Carrito de Compras</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong>{item.title}</strong><br />
              Cantidad: {item.quantity}<br />
              Precio unitario: ${item.price}<br />
              Subtotal: ${item.quantity * item.price}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => removeOneFromCart(item.id)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                -
              </button>
              <button
                onClick={() => addToCart(item)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total: ${total}</h3>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={handleConfirm}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Confirmar compra
        </button>

        <button
          onClick={handleClear}
          style={{
            padding: '10px 20px',
            backgroundColor: 'crimson',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default CartPage;
