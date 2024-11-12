"use server";
import { revalidatePath } from "next/cache";
import { actionClient } from "../safe-actions";
import { z } from "zod";
import CaisseService from "@/src/services/app/caisse.service";
import UserService from "@/src/services/app/user.service";
import  OperationCaisseService  from '@/src/services/app/operationCaisse.service';
import  OrganisationService  from '@/src/services/app/organisation.service';
type AsService =

  | UserService
  | CaisseService
  | OperationCaisseService
  | OrganisationService;

const getService = (name: string): AsService | null => {
  const services: Record<string, new () => AsService> = {
    users: UserService,
    operations: CaisseService,
    OperationCaisses: OperationCaisseService,
    organisations: OrganisationService ,
  };
  

  return services[name] ? new services[name]() : null;
};

export async function createData(
  serviceName: string,
  path: string | null | undefined,
  prevState: any,
  formData: FormData
) {
  try {
    console.log(serviceName);
    const service = getService(serviceName);
    
    if (!service) return { message: "Service non trouvé", code: 400 };

    const body = Object.fromEntries(formData.entries());
    const response = await service.create({ body });
    if (response.code === 200) revalidatePath(path ?? "");
    return response;
  } catch (e) {
    console.error(e);
    return { message: "Une erreur est survenue", code: 500 };
  }
}

export async function updateRow(
  id: number | string,
  serviceName: string,
  path: string | null | undefined,
  prevState: any,
  formData: FormData
) {
  try {
    const service = getService(serviceName);
    if (!service) return { message: "Service non trouvé", code: 400 };

    const body = Object.fromEntries(formData.entries());
    const response = await service.update({ body, id });
    console.log({body});
    if (response.code === 200) revalidatePath(path ?? "");
    return response;
  } catch (e) {
    console.error(e);
    return { message: "Une erreur est survenue", code: 500 };
  }
}

export const deleteRow = actionClient
  .schema(
    z.object({
      id: z.union([z.string(), z.number()]),
      serviceName: z.string(),
      path: z.string().nullable().optional(),
    })
  )
  .action(async ({ parsedInput: { id, serviceName, path } }) => {
    try {
      const service = getService(serviceName);
      if (!service) return { message: "Service non trouvé", code: 400 };

      const response = await service.delete_({ id });
      if (response.code === 200) revalidatePath(path ?? "");
      return response;
    } catch (e) {
      console.error(e);
      return { message: "Une erreur est survenue", code: 500 };
    }
  });
