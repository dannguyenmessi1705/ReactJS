import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";

import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext(); // Tạo context để quản lý việc mở đóng menu
function Menus({ children }) {
  // Tạo Menus component để quản lý việc mở đóng menu
  const [openId, setOpenId] = useState(""); // Tạo state openId để lưu id của menu đang mở và mở menu
  const [position, setPosition] = useState(null); // Tạo state position để lưu vị trí của menu
  const open = setOpenId; // Tạo hàm open để mở menu
  const close = () => setOpenId(""); // Tạo hàm close để đóng menu
  const context = {
    // Tạo context để truyền vào các component con
    openId,
    open,
    close,
    position,
    setPosition,
  };
  return (
    <MenusContext.Provider value={context}>{children}</MenusContext.Provider>
  );
}

function Toggle({ id }) {
  // Tạo Toggle component để mở menu
  const { openId, open, close, setPosition } = useContext(MenusContext); // Lấy ra openId, open, close, setPosition từ context
  function handleClick(event) {
    // Tạo hàm handleClick để xử lý sự kiện click
    const rect = event.target.closest("button").getBoundingClientRect(); // Lấy ra vị trí của button được click
    setPosition({
      // Set vị trí của menu
      x: window.innerWidth - rect.width - rect.x,
      y: rect.height + rect.y + 8,
    });

    openId === "" || openId !== id ? open(id) : close(); // Mở menu nếu menu chưa mở hoặc menu đang mở khác với menu được click
  }

  return (
    <StyledToggle onClick={handleClick}>
      {" "}
      {/* Sử dụng onClick để gọi hàm handleClick */}
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  // Tạo List component để hiển thị menu
  const { openId, position, close } = useContext(MenusContext); // Lấy ra openId, position, close từ context
  const ref = useOutsideClick(close); // Sử dụng hook useOutsideClick để đóng menu khi click ra ngoài menu và truyền hàm close vào để đóng menu

  if (openId !== id) return null; // Nếu openId khác id thì không hiển thị menu

  return createPortal(
    // Sử dụng createPortal để render menu ra ngoài root element
    <StyledList position={position} ref={ref}>
      {" "}
      {/* Truyền position và ref vào StyledList */}
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  // Tạo Button component để hiển thị các button trong menu
  const { close } = useContext(MenusContext); // Lấy ra hàm close từ context
  const handleClick = () => {
    // Tạo hàm handleClick để xử lý sự kiện click
    onClick?.(); // Gọi hàm onClick nếu có
    close(); // Đóng menu
  };
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {" "}
        {/* Sử dụng onClick để gọi hàm handleClick */}
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
