import ApiServiceType from "@/types/apiServiceType";
import { DefaultAppRowTypeInterface, SelectDataOption } from "@/types/app_types";
import ApiService from "../api.service";
import { ColumnDef } from "@tanstack/react-table";
import { CustomFieldProps } from "@/types/fieldsprops";

export default class RoleService extends ApiService {
  endpoint(): string {
    return "/" + this.getName() + "/";
  }

  async getAll({
    headers,
  }: {
    headers?: ApiServiceType.AppHeaders | null;
  }): Promise<ApiServiceType.ListResponse<any> | null> {
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
      return await response.json();
    }

    return {};
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
    const response = await this.patch({
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
    if (response.ok) {
      const rep = await response.json();
      rep.code = 200;
      return rep;
    }

    return { code: response.status, message: response.statusText };
  }

  getName() {
    return "roles";
  }

  getColumns() {
    const columns: ColumnDef<DefaultAppRowTypeInterface, any>[] = [
      {
        accessorKey: "nom_role",
        header: "Nom Rôle",
      },
      {
        accessorKey: "caisse",
        header: "Caisse",
      },
    ];
    return columns;
  }

  async getForm() {
    const options = await this.getDataSelectOptions();
    const form: CustomFieldProps[] = [
      {
        name: "nom_role",
        label: "Nom Rôle",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "caisse",
        label: "Page Caisse",
        type: "select",
        options: options.role,
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "partenaire",
        label: "Page Partenaire",
        type: "select",
        options: options.role,
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: " prestation",
        label: "Page Prestation",
        type: "select",
        options: options.role,
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "site",
        label: "Page Site",
        type: "select",
        options:options.role,
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "user",
        label: "Page Utilisateur",
        type: "select",
        options:options.role,
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "role",
        label: "Page Role",
        type: "select",
        options:options.role,
        classparent: "",
        customclass: "",
        classlabel: "",
      },
    ];

    return form;
  }

  async getDataSelectOptions(): Promise<{
    role: SelectDataOption[];
  }> {
    try {
      interface selectInterface {
        role: SelectDataOption[];
      }
      const response = await this.getDataSelectTable<selectInterface>([
        "role",
      ]);

      return {
        role: response.role,
      };
    } catch (error) {
      return {
        role: [],
      };
    }
  }
}