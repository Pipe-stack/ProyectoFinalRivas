import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'No podés realizar una compra sin productos.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    const order = {
      buyer: form,
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      date: Timestamp.now()
    };

    try {
      const ordersRef = collection(db, 'orders');
      const doc = await addDoc(ordersRef, order);
      clearCart();

      Swal.fire({
        icon: 'success',
        title: '¡Compra realizada!',
        html: `<p>Gracias por tu compra, <strong>${form.name}</strong>.<br>Tu código de pedido es:<br><strong>${doc.id}</strong></p>`,
        confirmButtonColor: '#3085d6'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al procesar la compra',
        text: 'Intenta nuevamente más tarde.',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '20px auto' }}
    >
      <h2>Formulario de Checkout</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{
          padding: '10px',
          backgroundColor: cart.length === 0 ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
        }}
        disabled={cart.length === 0}
      >
        Confirmar Compra
      </button>
    </form>
  );
}

export default CheckoutForm;
