import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabin } from "../services/apiCabins";

function Cabins() {
  useEffect(() => {
    const getData = async () => {
      const data = await getCabin();
      console.log(data);
    };
    getData();
  });
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
