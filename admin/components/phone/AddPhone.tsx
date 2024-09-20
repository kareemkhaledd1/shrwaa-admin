import Modal from "@/ui/Modal";
import AddPhoneForm from "@/components/phone/AddPhoneForm";

function AddPhone() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="phone-form">
          <button className="bg-orange-500 text-white px-5 py-2 rounded-md">
            Add Phone
          </button>
        </Modal.Open>
        <Modal.Window name="phone-form">
          <AddPhoneForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddPhone;
