import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StlyedSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1; // Thuộc tính grid-row có thể được sử dụng để xác định vị trí của một phần tử trên lượt xem grid.
  // 1/-1 có nghĩa là phần tử sẽ bắt đầu ở hàng 1 và kết thúc ở hàng cuối cùng của grid.
`;

function SideBar() {
  return (
    <StlyedSideBar>
      <Logo />
      <MainNav />
      <Uploader />
    </StlyedSideBar>
  );
}

export default SideBar;
