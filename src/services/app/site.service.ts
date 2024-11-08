import ApiServiceType from "@/types/apiServiceType";
import {
  DefaultAppRowTypeInterface,
  SelectDataOption,
} from "@/types/app_types";
import ApiService from "../api.service";
import { ColumnDef } from "@tanstack/react-table";
import { CustomFieldProps } from "@/types/fieldsprops";

export default class SiteService extends ApiService {
  endpoint(): string {
    return "/" + this.getName() + "/";
  }

  async getAll({
    headers,
  }: {
    headers?: ApiServiceType.AppHeaders | null;
  }): Promise<ApiServiceType.ListResponse<any> | null> {
    try {
      const response = await this.get({
        endPointOption: "",
        headers,
      });

      if (response.ok) {
        return await response.json();
      }

      return null;
    } catch (error) {
      return null;
    }
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
    return "sites";
  }

  getColumns() {
    const columns: ColumnDef<DefaultAppRowTypeInterface, any>[] = [
      {
        accessorKey: "nom",
        header: "Nom",
      },
    ];
    return columns;
  }

  async getForm() {
    //on appelle cette fonction pour avoir tout les selet defini
    //ensuite on va attribuer aux champs select leur options
    const options = await this.getDataSelectOptions();
    const form: CustomFieldProps[] = [
      {
        name: "nom",
        label: "Nom",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "id_administration",
        label: "Nom",
        type: "select",
        disabled: true,
        // options: [{ value: "1", label: "dgtt" }],
        options: options.administration,
        defaultValue: "1",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
    ];

    return form;
  }

  async getDataSelectOptions(): Promise<{
    administration: SelectDataOption[];
  }> {
    try {
      interface selectInterface {
        administration: SelectDataOption[];
      }
      const response = await this.getDataSelectTable<selectInterface>([
        "administration",
      ]);

      return {
        administration: response.administration,
      };
    } catch (error) {
      return {
        administration: [],
      };
    }
  }
}
