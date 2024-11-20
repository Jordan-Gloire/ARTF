// import OrganisationService from "@/src/services/app/organisation.service";
import AppPageTable from "@/components/custom/ui/AppPageTable";
import { permanentRedirect } from "next/navigation";

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

  const user = await service.getCurrentUser();

  if (user?.roles != "ROLE_ADMIN") permanentRedirect("/");

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
