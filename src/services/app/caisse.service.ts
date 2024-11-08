import ApiServiceType from "@/types/apiServiceType";
import { DefaultAppRowTypeInterface, SelectDataOption } from "@/types/app_types";
import ApiService from "../api.service";
import { ColumnDef } from "@tanstack/react-table";
import { CustomFieldProps } from "@/types/fieldsprops";

export default class CaisseService extends ApiService {
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
      endPointOption: "/" + id.toString(),
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
    return "caisses";
  }

  getColumns() {
    const columns: ColumnDef<DefaultAppRowTypeInterface, any>[] = [
      {
        accessorKey: "intitule",
        header: "Intitulé",
      },
      {
        accessorKey: "cout_total",
        header: "Coût total",
      },
      {
        accessorKey: "id_prestation",
        header: "Prestation",
      },
      {
        accessorKey: "id_payment",
        header: "Référence Mobile Money",
      },
      {
        accessorKey: "numero_recu_caisse",
        header: "Référence Mobile Money",
      },
    ];
    return columns;
  }

  async getForm() {
    const options = await this.getDataSelectOptions();
    const form: CustomFieldProps[] = [
      {
        name: "intitule",
        label: "Intitulé",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      
      {
        name: "cout_total",
        label: "Coût total",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "id_user",
        label: "Utilisateur",
        type: "select",
        disabled: true,
        options: options.caisse,
        defaultValue: "1",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "id_prestation",
        label: "Prestation",
        type: "select",
        disabled: true,
        options: options.caisse,
        defaultValue: "1",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "id_payment",
        label: "Référence Mobile Money",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "status",
        label: "Statut",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "print",
        label: "Print",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
      {
        name: "numero_recu_caisse",
        label: "Numero de recu caisse",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      },
    ];

    return form;
  }
  async getDataSelectOptions(): Promise<{
    caisse: SelectDataOption[];
  }> {
    try {
      interface selectInterface {
        caisse: SelectDataOption[];
      }
      const response = await this.getDataSelectTable<selectInterface>([
        "caisse",
      ]);

      return {
        caisse: response.caisse,
      };
    } catch (error) {
      return {
        caisse: [],
      };
    }
  }
}
