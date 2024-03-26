import { useSearchParams } from "react-router-dom";
import Select from "./Select";
function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const sortBy = searchParam.get("sortBy") || "";
  const handleChange = (event) => {
    searchParam.set("sortBy", event.target.value);
    setSearchParam(searchParam);
  };
  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
