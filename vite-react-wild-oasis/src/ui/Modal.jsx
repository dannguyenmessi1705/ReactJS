import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom"; // import createPortal từ react-dom để render modal ra ngoài root element
import { cloneElement, createContext, useState } from "react";
import { useContext } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
// createPortal nhận vào 2 tham số: element và root element để render element ra ngoài root element

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext(); // Tạo context để quản lý việc mở đóng modal

function Modal({ children }) {
  // Tạo Modal component để quản lý việc mở đóng modal
  const [openName, setOpenName] = useState(""); // Tạo state openName để lưu tên modal đang mở

  const close = () => setOpenName(""); // Tạo hàm close để đóng modal
  const open = setOpenName; // Tạo hàm open để mở modal

  const context = {
    // Tạo context để truyền vào các component con
    openName,
    close,
    open,
  };

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider> // Truyền context vào Provider để sử dụng ở các component con
  );
}

function Open({ children, opens: opensWindowName }) {
  // Tạo Open component để mở modal
  const { open } = useContext(ModalContext); // Lấy ra hàm open từ context

  return cloneElement(children, { onClick: () => open(opensWindowName) }); // Truyền hàm open vào onClick của children vì không thể truyền props vào children trực tiếp được nên sử dụng cloneElement
}

function Window({ children, name, cabin }) {
  // Tạo Window component để hiển thị modal
  const { openName, close } = useContext(ModalContext); // Lấy ra openName và hàm close từ context
  const ref = useOutsideClick(close); // Sử dụng hook useOutsideClick để đóng modal khi click ra ngoài modal và truyền hàm close vào để đóng modal
  if (openName !== name) return null; // Nếu openName khác name thì không hiển thị modal

  return createPortal(
    // Sử dụng createPortal để render modal ra ngoài root element
    <Overlay>
      <StyledModal ref={ref}> {/* Truyền ref vào StyledModal để sử dụng hook useOutsideClick */}
        <Button onClick={close}>
          {" "}
          {/* Tạo button để đóng modal */}
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, { onClose: close, editCabin: cabin })}
        </div>{" "}
        {/* Truyền hàm close vào onClose của children vì không thể truyền props vào children trực tiếp được nên sử dụng cloneElement */}
      </StyledModal>
    </Overlay>,
    document.body // Render modal ra ngoài root element (document.body)
  );
}

Modal.Open = Open; // Gán Open vào Modal để sử dụng
Modal.Window = Window; // Gán Window vào Modal để sử dụng
export default Modal;

// export default function Modal({ children, onClose }) {
//   return createPortal(
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}>
//           <HiXMark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body // Render modal ra ngoài root element (document.body)
//   );
// }
