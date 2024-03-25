import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      {" "}
      {/* Tạo modal để hiển thị form tạo cabin và bảng cabin */}
      <Modal.Open opens="cabin-form">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      <Modal.Open opens="table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}
//  <CreateCabinForm /> và <CabinTable /> được render trong Modal.Window với name tương ứng,
// vì không thể truyền props vào children trực tiếp nên sử dụng cloneElement để truyền props vào children
// và trong <CreateCabinForm /> và <CabinTable /> sử dụng props onClose để đóng modal
export default AddCabin;
