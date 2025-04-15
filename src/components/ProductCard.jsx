import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

  return (
    <div className="product-card">
      <div className="card-badge">Новинка</div>
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.jpg';
            }}
          />
        </div>
      </Link>

      <div className="product-info">
        <h3>{product.brand} {product.name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;