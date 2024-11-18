
import AppPageTable from "@/components/custom/ui/AppPageTable";
// import CaisseService from "@/src/services/app/caisse.service";

export default async function page() {

    const myClass = (await import("@/src/services/app/caisse.service")).default;
    const service = new myClass();

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
