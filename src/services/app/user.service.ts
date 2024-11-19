import ApiServiceType from "@/types/apiServiceType";
import {
  DefaultAppRowTypeInterface,
  SelectDataOption,
} from "@/types/app_types";
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
      const rep = await response.json();
      return rep;
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
      // {
      //   accessorKey: "fonction",
      //   header: "Fonction",
      // },
      {
        accessorKey: "id_organisation",
        header: "Organisation",
      },
      {
        accessorKey: "roles",
        header: "Rôle",
      },
    ];
    return columns;
  }

  async getForm() {
    const options = await this.getDataSelectOptions();
    // const currentAdministration = await this.getCurrentAdministration();
    const currentOrganisation = await this.getCurrentOrganisation();
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
        type: "tel",
        classparent: "",
        customclass: "",
        classlabel: "",
      },

      {
        name: "id_organisation",
        label: "Organisation",
        type: "select",
        disabled: !!currentOrganisation,
        options: options.organisation,
        classparent: "",
        customclass: "",
        classlabel: "",
      },

      {
        name: "roles",
        label: "Rôle",
        type: "select",
        options: [
          { value: "ROLE_ADMIN", label: "Admin" },
          { value: "ROLE_USER", label: "User" },
        ],
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

  async getDataSelectOptions(): Promise<{
    organisation: SelectDataOption[];
    user: SelectDataOption[];
    // role: SelectDataOption[];
  }> {
    try {
      interface SelectInterface {
        organisation: SelectDataOption[];
        user: SelectDataOption[];
      }
      const response = await this.getDataSelectTable<SelectInterface>([
        "organisation",
        "user",
      ]);

      return {
        organisation: response.organisation,
        user: response.user,
      };
    } catch (error) {
      return {
        organisation: [],
        user: [],
      };
    }
  }
}
