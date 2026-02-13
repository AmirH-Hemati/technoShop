import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CategoryRow from "./CategoryRow";
import { useCategories } from "./useCategories";

function CategoriesTable() {
  const { categories, isLoading } = useCategories();
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 1fr 1.8fr 1fr 0.6fr">
        <Table.Header>
          <div></div>
          <div>عنوان</div>
          <div> تاریخ ساخت</div>
          <div>اخرین آپدیت</div>
          <div>موجودیت</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={categories}
          render={(category) => (
            <CategoryRow key={category._id} category={category} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CategoriesTable;
