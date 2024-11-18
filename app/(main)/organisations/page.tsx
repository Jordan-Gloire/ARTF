// import OrganisationService from "@/src/services/app/organisation.service";
import AppPageTable from "@/components/custom/ui/AppPageTable";

export default async function page() {
  const myClass = (await import("@/src/services/app/organisation.service"))
    .default;
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
