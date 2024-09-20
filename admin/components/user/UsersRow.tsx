import Table from "@/ui/Table";
import Image from "next/image";
import Modal from "@/ui/Modal";
import Menus from "@/ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "@/ui/ConfirmDelete";
import UpdateUserForm from "@/components/user/UpdateUserForm";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar: string;
}

function UsersRow({ user }: { user: User }) {
  const { username, email, role, id, avatar } = user;

  return (
    <Table.Row>
      <Image
        src={avatar || "/default-user.jpg"}
        alt={"avatar"}
        width={40}
        height={36}
        className="rounded-full object-cover w-12 h-12"
        priority
      />
      <div className="text-slate-700 font-semibold text-[16px] self-center">
        {username}
      </div>
      <div className="text-slate-500 font-semibold text-[16px] self-center">
        {email}
      </div>
      <div className="text-slate-500 font-semibold text-[16px] self-center">
        {role}
      </div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Modal.Open opens="editUser">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="editUser">
              <UpdateUserForm dataToEdit={user} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={"Phone"}
                onConfirm={() => {}}
                disabled={false}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default UsersRow;
