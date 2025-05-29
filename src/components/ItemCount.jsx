import { useState } from 'react';

function ItemCount({ stock, onAdd }) {
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    if (count > 0 && count <= stock) {
      onAdd(count);
    }
  };

  return (
    <div>
      <button onClick={() => setCount(count - 1)} disabled={count <= 1}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)} disabled={count >= stock}>+</button>
      <button onClick={handleAdd}>Agregar al carrito</button>
    </div>
  );
}

export default ItemCount;
