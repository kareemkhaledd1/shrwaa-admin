import Menus from "@/ui/Menus";
import Table from "@/ui/Table";
import PhonesRow from "@/components/phone/PhonesRow";
import Spinner from "@/ui/Spinner";
import Pagination from "@/ui/Pagination";

interface Phone {
  id: string;
  name: string;
  img: string;
  goodPrice: number;
  fairPrice: number;
  brand: [];
}

function PhonesTable({
  isPending,
  phones,
  totalCount,
}: {
  isPending: boolean;
  phones: Phone[];
  totalCount: number;
}) {
  if (isPending) {
    return <Spinner />;
  }

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 1fr 1fr 1fr "}>
        <Table.Header>
          <div></div>
          <div className="font-bold text-gray-600 text-xs ">Name</div>
          <div className="font-bold text-gray-600 text-xs">Good Price</div>
          <div className="font-bold text-gray-600 text-xs">fair Price</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={phones}
          render={(phone) => <PhonesRow key={phone.id} phone={phone} />}
        />
        <Table.Footer>
          <Pagination count={totalCount} pageSize={8} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PhonesTable;
