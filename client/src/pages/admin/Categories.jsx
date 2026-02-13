import AddCategory from "../../features/categories/AddCategory";
import CategoriesTable from "../../features/categories/CategoriesTable";
import Row from "../../ui/Row";

function Categories() {
  return (
    <>
      <Row type="horizontal">
        <h1>دسته بندی ها </h1>
        <p>فیلتر / مرتب سازی</p>
      </Row>

      <Row>
        <CategoriesTable />
        <AddCategory />
      </Row>
    </>
  );
}

export default Categories;
