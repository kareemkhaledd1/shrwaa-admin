import Modal from "@/ui/Modal";
import AddUser from "@/components/user/AddUser";

function UserTableOperations() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="ADDUSER">
          <button className="bg-orange-500 text-white px-3 py-2 rounded-md">
            Add User
          </button>
        </Modal.Open>
        <Modal.Window name="ADDUSER">
          <AddUser />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UserTableOperations;
