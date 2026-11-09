import { useParams } from 'react-router';

function ProductDetail() {
  const { id } = useParams();
  return <h1>Product #{id}</h1>;
}

export default ProductDetail;