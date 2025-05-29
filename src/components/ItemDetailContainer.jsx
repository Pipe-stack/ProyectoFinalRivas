import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, 'products', productId);
    getDoc(docRef)
      .then(doc => {
        setProduct({ id: doc.id, ...doc.data() });
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return <ItemDetail product={product} />;
}

export default ItemDetailContainer;
