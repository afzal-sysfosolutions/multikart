
import ProductDetailContent from "@/Components/ProductDetail";
const ProductDetails = ({ params }) => {
    return <ProductDetailContent params={params?.productSlug} />;
  };
  
  export default ProductDetails;