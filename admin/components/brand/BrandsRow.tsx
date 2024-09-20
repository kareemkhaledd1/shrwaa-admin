import Image from "next/image";
import Table from "@/ui/Table";
import Modal from "@/ui/Modal";
import Menus from "@/ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import AddBrandForm from "@/components/brand/AddBrandForm";
import ConfirmDelete from "@/ui/ConfirmDelete";
import { useDeleteBrand } from "@/hooks/useDeleteBrand";

interface Brand {
  id: string;
  name: string;
  image: string;
  available: boolean;
  published: boolean;
}

function BrandsRow({ brand }: { brand: Brand }) {
  const { image, name, published, id } = brand;

  const { isDeleting, deleteBrand } = useDeleteBrand();

  return (
    <Table.Row>
      <Image
        src={image}
        alt={name}
        width={400}
        height={200}
        className="max-w-[60px] w-auto max-h-[40px] h-auto object-cover object-center"
      />
      <div className="text-gray-600 font-semibold text-[16px] self-center">
        {name}
      </div>

      <div
        className={`self-center text-sm  ${published ? "text-green-500" : "text-red-300"}`}
      >
        {published ? "Published" : "Not published"}
      </div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <AddBrandForm dataToEdit={brand} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={"brand"}
                onConfirm={() => deleteBrand(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BrandsRow;
