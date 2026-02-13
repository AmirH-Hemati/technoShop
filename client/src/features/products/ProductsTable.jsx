import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import ProductRow from "./ProductRow";
import { useProducts } from "./useProducts";

function ProductsTable() {
  const { products, isLoading } = useProducts();
  if (isLoading) return <p>loading</p>;

  return (
    <Menus>
      <Table columns="0.8fr 2fr 2.6fr 1fr 2.2fr 1fr 0.4fr">
        <Table.Header>
          <div></div>
          <div>نام محصول</div>
          <div>قیمت </div>
          <div>تخفیف </div>
          <div>تاریخ افزودن</div>
          <div>دسته بندی </div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={products}
          render={(product) => (
            <ProductRow product={product} key={product._id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ProductsTable;
