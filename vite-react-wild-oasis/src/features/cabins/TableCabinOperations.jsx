import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
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
    </TableOperations>
  );
}

export default TableCabinOperations;
