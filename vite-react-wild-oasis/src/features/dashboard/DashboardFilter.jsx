import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterValue="last"
      filterOpions={[
        { key: "7", lable: "Last 7 days" },
        { key: "30", lable: "Last 30 days" },
        { key: "90", lable: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
