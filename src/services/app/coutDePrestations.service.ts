import ApiServiceType from "@/types/apiServiceType";
import ApiService from "../api.service";
import { ColumnDef } from "@tanstack/react-table";
import { CustomFieldProps } from "@/types/fieldsprops";
import { DefaultAppRowTypeInterface, SelectDataOption } from "@/types/app_types";

export default class CoutDePrestationService extends ApiService {
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
    console.log("msgInfos", body);

    const response = await this.post({
      endPointOption: "",
      body,
      headers,
    });

    if (response.ok) {
      const rep = await response.json();
      if (rep) rep.code = 200;

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

    console.log('httht');
    
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
    return "cout-prestations";
  }

  getColumns() {
    const columns: ColumnDef<DefaultAppRowTypeInterface, any>[] = [
      {
        accessorKey: "cout",
        header: "Cout",
      },
      {
        accessorKey: "id_prestation",
        header: "Prestation",
      },
      {
        accessorKey: "partenaire",
        header: "Partenaire",
      },
    ];
    return columns;
  }

  async getForm() {
    const options = await this.getDataSelectOptions();
    
    const form: CustomFieldProps[] = [
      {
        name: "cout",
        label: "Coût",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "id_partenaire",
        label: "Parenaires",
        type: "select",
        disabled: true,
        options: options.coutDeprestation,
        defaultValue: "1",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "id_prestation",
        label: "Prestations",
        type: "select",
        disabled: true,
        options: options.coutDeprestation,
        defaultValue: "1",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
    ];

    return form;
  }
  async getDataSelectOptions(): Promise<{
    coutDeprestation: SelectDataOption[];
  }> {
    try {
      interface selectInterface {
        coutprestation: SelectDataOption[];
      }
      const response = await this.getDataSelectTable<selectInterface>([
        "coutprestation",
      ]);

      return {
        coutDeprestation: response.coutprestation,
      };
    } catch (error) {
      return {
        coutDeprestation: [],
      };
    }
  }
  
}
