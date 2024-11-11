import UserService from "@/src/services/app/user.service";
import AppPageTable from "@/components/custom/ui/AppPageTable";
import OperationCaisseService from "@/src/services/app/operationCaisse.service";

export default async function page() {
  const service = new OperationCaisseService();

  const role = await service.getDefaultRole();
  const columns = service.getColumns();
  const form = await service.getForm();
  const data = await service.getAll({});
  // const data: DefaultAppRowTypeInterface[] = getAll ? getAll.data : [];
  // const data: any[] = [];

  return (
    <AppPageTable<any>
      role={role}
      form={form}
      columns={columns}
      data={data}
      serviceName={service.getName()}
    />
  );
}
