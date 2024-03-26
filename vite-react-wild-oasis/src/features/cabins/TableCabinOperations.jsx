import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function TableCabinOperations() {
  return (
    <TableOperations>
      <Filter
        filterValue="discount"
        filterOpions={[
          { key: "all", lable: "All" },
          { key: "no-discount", lable: "No Discount" },
          { key: "with-discount", lable: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort name by (A-Z)",
          },
          {
            value: "name-desc",
            label: "Sort name by (Z-A)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort price in ascending order",
          },
          {
            value: "regularPrice-desc",
            label: "Sort price in descending order",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort max capacity in ascending order",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort max capacity in descending order",
          },
        ]}
      />
    </TableOperations>
  );
}

export default TableCabinOperations;
