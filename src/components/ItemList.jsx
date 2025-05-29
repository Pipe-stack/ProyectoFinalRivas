import Item from "./Item";
import './ItemList.css';

const ItemList = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((prod) => (
        <Item key={prod.id} product={prod} />
      ))}
    </div>
  );
};

export default ItemList;
