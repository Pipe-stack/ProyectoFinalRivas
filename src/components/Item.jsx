import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const Item = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
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

  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} style={{ width: "150px" }} />
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>

      <button onClick={handleAddToCart}>Agregar al carrito</button>

      <Link to={`/producto/${product.id}`}>
        <button style={{ marginLeft: '10px' }}>Ver producto</button>
      </Link>
    </div>
  );
};

export default Item;
