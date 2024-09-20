import Table from "@/ui/Table";
import Image from "next/image";
import { formatCurrency } from "@/utils/helpers";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "@/ui/ConfirmDelete";
import AddPhoneForm from "@/components/phone/AddPhoneForm";
import { useDeletePhone } from "@/hooks/useDeletePhone";

interface Phone {
  id: string;
  name: string;
  img: string;
  goodPrice: number;
  fairPrice: number;
  brand: string;
}

function PhonesRow({ phone }: { phone: Phone }) {
  const { name, img, goodPrice, fairPrice, id, brand } = phone;
  const { deletePhone, isDeleting } = useDeletePhone();

  return (
    <Table.Row>
      <Image
        src={img}
        alt={name}
        width={400}
        height={200}
        className="max-w-[60px] w-auto max-h-[40px] h-auto object-cover object-center"
        priority
      />
      <div className="text-gray-600 font-semibold text-[16px] self-center">
        {name}
      </div>
      <div className="self-center text-sm">{formatCurrency(goodPrice)}</div>
      <div className="self-center text-sm">{formatCurrency(fairPrice)}</div>

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
              <AddPhoneForm dataToEdit={phone} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={"Phone"}
                onConfirm={() => deletePhone(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default PhonesRow;
