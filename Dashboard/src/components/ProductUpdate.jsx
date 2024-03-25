import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";

const ProductUpdate = () => {

  const { idProduct } = useParams();
  console.log(idProduct);
  return (
    <>
      <ProductForm
        idProduct={idProduct}
      />
    </>
  )
}

export default ProductUpdate;