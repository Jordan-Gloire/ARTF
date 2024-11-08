import ApiServiceType from "@/types/apiServiceType";
import { DefaultAppRowTypeInterface } from "@/types/app_types";
import ApiService from "../api.service";
import { ColumnDef } from "@tanstack/react-table";
import { CustomFieldProps } from "@/types/fieldsprops";

export default class UserService extends ApiService {
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
      endPointOption: "register",
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
    if (response.ok) {
      const rep = await response.json();
      rep.code = 200;
      return rep;
    }

    return { code: response.status, message: response.statusText };
  }

  getName() {
    return "users";
  }

  getColumns() {
    const columns: ColumnDef<DefaultAppRowTypeInterface, any>[] = [
      {
        accessorKey: "nom",
        header: "Nom",
      },
      {
        accessorKey: "telephone",
        header: "Téléphone",
      },
      {
        accessorKey: "fonction",
        header: "Fonction",
      },
      {
        accessorKey: "id_administration",
        header: "Administration",
      },
      {
        accessorKey: "id_site",
        header: "Site",
      },
      {
        accessorKey: "role",
        header: "Rôle",
      },
    ];
    return columns;
  }

  async getForm() {
    const form: CustomFieldProps[] = [
      {
        name: "nom",
        label: "Nom",
        type: "text",
        classparent: "col-span-2",
        customclass: "",
        classlabel: "",
      },
      {
        name: "telephone",
        label: "Téléphone",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "fonction",
        label: "Fonction",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "id_administration",
        label: "Administration",
        type: "select",
        disabled : true,
        options: [{ label: "dgtt", value: "1" }],
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "id_site",
        label: "Site",
        disabled : true,
        options: [{ label: "dgtt", value: "1" }],
        type: "select",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "roles",
        label: "Rôle",
        disabled : true,
        options: [{ label: "dgtt", value: "1" }],
        type: "select",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "password",
        label: "Mot de passe",
        type: "password",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
    ];

    return form;
  }
}
