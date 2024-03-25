import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (

    <div className="card shadow mb-4 maxwidth"  onClick={() => navigate(`/products/${product.id}`)}>
      <div className="card-header py-3">
        <h5 className="m-0 font-weight-bold text-gray-800">{product.name || <Skeleton />}</h5>
      </div>
      <div className="card-body">
        <div className="text-center">
          <img
            className="img-fluid px-3 mt-3 mb-4"
            src={`http://localhost:3010/img/products/${product.image}`}
            alt={product.name}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <p>{product.description_short || <Skeleton />}</p>
      </div>
    </div>

  );
};

export default ProductCard;