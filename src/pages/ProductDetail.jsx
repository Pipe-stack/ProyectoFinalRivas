import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'productos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    Swal.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: `${product.title} fue agregado al carrito.`,
      timer: 1500,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
    });
  };

  if (!product) return <p style={{ textAlign: 'center' }}>Cargando...</p>;

  return (
    <div className="product-detail" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <img src={product.image} alt={product.title} style={{ width: '250px', borderRadius: '10px' }} />
      <div className="product-detail-info">
        <h2>{product.title}</h2>
        <p><strong>Descripción:</strong> {product.description}</p>
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <button
          onClick={handleAddToCart}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
