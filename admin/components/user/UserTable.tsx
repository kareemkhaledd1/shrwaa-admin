import { useGetUsers } from "@/hooks/useGetUsers";
import Table from "@/ui/Table";
import UsersRow from "@/components/user/UsersRow";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";

function UserTable() {
  const { users, isPending } = useGetUsers();

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Menus>
      <Table columns={"0.6fr 1fr 1.8fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Username</div>
          <div>Email</div>
          <div>Role</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UsersRow key={user.id} user={user} />}
        />
      </Table>
    </Menus>
  );
}

export default UserTable;
