import ApiServiceType from "@/types/apiServiceType";
import {
  DefaultAppRowTypeInterface,
  SelectDataOption,
} from "@/types/app_types";
import ApiService from "../api.service";
import { ColumnDef } from "@tanstack/react-table";
import { CustomFieldProps } from "@/types/fieldsprops";
import { cellMoney } from "@/src/hooks/client_hooks";

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

  async validatePrint(id: number | string) {
    try {
      const response = await this.put({
        endPointOption: id.toString(),
        body: {},
      });
      // response
    } catch (error) {}
  }

  getColumns() {
    const columns: ColumnDef<DefaultAppRowTypeInterface, any>[] = [
      {
        accessorKey: "montant",
        header: "Montant",
      },
      {
        accessorKey: "nom_destinataire",
        header: "Nom destinataire",
        cell: cellMoney,
      },
      {
        accessorKey: "numero_cni_dest",
        header: "Numero CNI Destinataire",
      },
      {
        accessorKey: "nom_expediteur",
        header: "Nom expéditeur",
      },
      {
        accessorKey: "numero_cni_exp",
        header: "Numero CNI Expediteur",
      },
    ];
    return columns;
  }

  async getForm() {
    const options = await this.getDataSelectOptions();
    const user = await this.getCurrentUser();
    const form: CustomFieldProps[] = [
      {
        name: "montant",
        label: "Montant",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
      {
        name: "nom_destinataire",
        label: "Nom destinataire",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
      {
        name: "numero_cni_dest",
        label: "Numero CNI Dest",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
      {
        name: "nom_expediteur",
        label: "Nom expéditeur",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
      {
        name: "numero_cni_exp",
        label: "Numero CNI Exp",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      },  
    ];

    return form;
  }
  async getDataSelectOptions(): Promise<{
    user: SelectDataOption[];
    prestation: SelectDataOption[];
  }> {
    try {
      interface SelectInterface {
        user: SelectDataOption[];
        prestation: SelectDataOption[];
      }
      const response = await this.getDataSelectTable<SelectInterface>([
        "user",
        "prestation",
      ]);

      return {
        user: response.user,
        prestation: response.prestation,
      };
    } catch (error) {
      return {
        user: [],
        prestation: [],
      };
    }
  }
}