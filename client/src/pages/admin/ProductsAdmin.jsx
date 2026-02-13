import AddProduct from "../../features/products/AddProduct";
import ProductsTable from "../../features/products/ProductsTable";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function ProductsAdmin() {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">محصولات</Heading>
        <p>sort / filter</p>
      </Row>
      <Row>
        <ProductsTable />
        <AddProduct />
      </Row>
    </>
  );
}
export default ProductsAdmin;
