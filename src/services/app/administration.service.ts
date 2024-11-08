import ApiServiceType from "@/types/apiServiceType";
import ApiService from "../api.service";
import { ColumnDef } from "@tanstack/react-table";
import { CustomFieldProps } from "@/types/fieldsprops";
import { Administration } from "@/types/app_types";

export default class AdministrationService extends ApiService {
  endpoint(): string {
    return "/" + this.getName() + "/";
  }

  async getAll({
    headers,
  }: {
    headers?: ApiServiceType.AppHeaders | null;
  }): Promise<ApiServiceType.ListResponse<Administration> | null> {
    const response = await this.get({
      endPointOption: "",
      headers,
    });

    if (response.ok) {
      return await response.json();
    }

    return null;
  }

  async get_({
    headers,
    id,
  }: {
    headers?: ApiServiceType.AppHeaders;
    id: string | number;
  }) {
    const response = await this.get({
      endPointOption: id.toString(),
      headers,
    });
    if (response.ok) {
      const rep = await response.json();
      rep.code = 200;
      return rep;
    }

    return { code: response.status, message: response.statusText };
  }

  async create({
    headers,
    body,
  }: {
    headers?: ApiServiceType.AppHeaders;

    body: ApiServiceType.BodyClassic;
  }) {
    

    const response = await this.post({
      endPointOption: "",
      body,
      headers,
    });
    if (response.ok) {
      const rep = await response.json();
      
      rep.code = 200;
      return rep;
    }

    return { code: response.status, message: response.statusText };
  }

  async update({
    headers,
    body,
    id,
  }: {
    headers?: ApiServiceType.AppHeaders;
    id: string | number;
    body: ApiServiceType.BodyClassic;
  }) {
    const response = await this.put({
      endPointOption: id.toString(),
      body,
      headers,
    });
    if (response.ok) {
      const rep = await response.json();
      rep.code = 200;
      return rep;
    }

    return { code: response.status, message: response.statusText };
  }

  async delete_({
    headers,
    id,
  }: {
    headers?: ApiServiceType.AppHeaders;
    id: string | number;
  }) {
    const response = await this.delete({
      endPointOption: id.toString(),
      headers,
    });

    console.log("msgRepkjgkjfvh");

    if (response.ok) {
      const rep = await response.json();
      console.log("msgRep",rep);
      rep.code = 200;
      return rep;
    }

    return { code: response.status, message: response.statusText };
  }

  getName() {
    return "administrations";
  }

  getColumns() {
    const columns: ColumnDef<Administration, any>[] = [
      {
        accessorKey: "nom",
        header: "Nom",
      },
      {
        accessorKey: "sigle",
        header: "Sigle",
      },
      {
        accessorKey: "path_logo",
        header: "Logo de l'admin",
      },
    ];
    return columns;
  }

  async getForm() {
    const form: CustomFieldProps[] = [
      {
        name : "nom",
        type : "text",
        label : "Nom"
      },
      {
        name : "sigle",
        type : "text",
        label : "Sigle"
      },
      {
        name : "path_logo",
        type : "text",
        label : "Logo de l'admin"
      }
    ];
    return form;
  }
}
