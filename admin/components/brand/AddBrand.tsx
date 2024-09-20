import AddBrandForm from "@/components/brand/AddBrandForm";
import Modal from "@/ui/Modal";

function AddBrand() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="brand-form">
          <button className="bg-orange-500 text-white px-5 py-2 rounded-md">
            Create brand
          </button>
        </Modal.Open>
        <Modal.Window name="brand-form">
          <AddBrandForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBrand;
