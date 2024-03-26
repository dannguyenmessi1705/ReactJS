import { useQuery } from "@tanstack/react-query";
// import styled from "styled-components";
import { getCabin } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const [searchParams] = useSearchParams();
  const currentFilter = searchParams.get("discount") || "all";
  let cabinFilter = [];
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });
  if (currentFilter === "all") {
    cabinFilter = cabins;
  } else if (currentFilter === "no-discount") {
    cabinFilter = cabins.filter((cabin) => cabin.discount === 0);
  } else if (currentFilter === "with-discount") {
    cabinFilter = cabins.filter((cabin) => cabin.discount > 0);
  }

  if (isLoading) return <Spinner />;

  return (
    // Wrap component vào trong Menus để tạo dropdown
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        {" "}
        {/* Thêm columns */}
        <Table.Header>
          {" "}
          {/* Thêm role="row" */}
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabinFilter}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
