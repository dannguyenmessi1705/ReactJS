import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Filter({ filterValue, filterOpions }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentFilter = searchParam.get(filterValue) || filterOpions.at(0).key;
  const handleFilter = (value) => {
    if (searchParam.get("page")) {
      searchParam.set("page", 1);
    }
    searchParam.set(filterValue, value);
    setSearchParam(searchParam);
  };
  return (
    <StyledFilter>
      {filterOpions.map((option) => (
        <FilterButton
          key={option.key}
          onClick={() => handleFilter(option.key)}
          active={option.key === currentFilter}
          disabled={option.key === currentFilter}
        >
          {option.lable}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
