import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCabin as deleteCabinApi,
  createCabin as createCabinApi,
} from "../../services/apiCabins.js";
import toast from "react-hot-toast"; // Nhập toast để sử dụng, lưu ý đã khai báo component <Toaster /> ở component cha
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal.jsx";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false); // Tạo state showForm để hiển thị form tạo cabin

  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;
  const queryClient = useQueryClient(); // Lấy ra queryClient từ hook useQueryClient đã được định nghĩa ở App.jsx
  const { isPending: isLoadingDelete, mutate: deleteCabin } = useMutation({
    // Lấy ra isLoadingDelete và mutate(function) từ hook useMutation để xử lý việc xóa cabin
    mutationFn: deleteCabinApi, // Hàm xóa cabin
    onSuccess: () => {
      toast.success("Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    }, // Khi xóa thành công, thông báo và sử dụng queryClient để gọi hàm invalidateQueries nhằm báo cho react-query biết rằng dữ liệu đã bị thay đổi và cần phải fetch lại
    onError: (err) => {
      toast.error(err.message);
    }, // Khi xóa thất bại, thông báo lỗi
  }); // Tạo một mutation để xóa cabin, lưu ý mutate là một function

  const { isPending: isLoadingDuplicate, mutate: duplicate } = useMutation({
    mutationFn: (cabin) => createCabinApi(cabin),
    onSuccess: () => {
      toast.success("Cabin duplicated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const onDuplicate = () => {
    const { id, ...duplicateCabin } = cabin;
    duplicate({ ...duplicateCabin, name: `${name} (copy)` });
  };

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={onDuplicate} disabled={isLoadingDelete}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm(true)} disabled={isLoadingDelete}>
            <HiPencil />
          </button>
          <button
            onClick={() => deleteCabin(cabinId)}
            disabled={isLoadingDelete}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CreateCabinForm
            editCabin={cabin}
            onClose={() => setShowForm(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default CabinRow;
