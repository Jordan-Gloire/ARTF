import ApiServiceType from "@/types/apiServiceType";
import ApiService from "../api.service";
import { ColumnDef } from "@tanstack/react-table";
import { CustomFieldProps } from "@/types/fieldsprops";
import {
  DefaultAppRowTypeInterface,
  OptionsFilterOpCaisse,
  SelectDataOption,
} from "@/types/app_types";

export default class OperationCaisseService extends ApiService {
  // endpoint(): string {
  //   return "/main/" + this.getName() + '/filtre';
  // }
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
    console.log("msgBody",body);
    

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
      endPointOption: "/" + id.toString(),
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
      endPointOption: "/" + id.toString(),
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
    return "operations";
  }

  getColumns() {
    const columns: ColumnDef<DefaultAppRowTypeInterface, any>[] = [
      {
        accessorKey: "Montant",
        header: "Montant",
      },
      {
        accessorKey: "NomDestinataire",
        header: "Nom destinataire",
        // cell: cellMoney,
      },
      {
        accessorKey: "NumeroCNIDestinataire",
        header: "Numero CNI Destinataire",
      },
      {
        accessorKey: "NomExpediteur",
        header: "Nom expéditeur",
      },
      {
        accessorKey: "NumeroCNIExpediteur",
        header: "Numero CNI Expediteur",
      },
    ];
    return columns;
  }

  async getForm() {
    // const options = await this.getDataSelectOptions();
    const user = await this.getCurrentUser();
    const form: CustomFieldProps[] = [
      {
        name: "Montant",
        label: "Montant",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
      {
        name: "NomDestinataire",
        label: "Nom destinataire",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
      {
        name: "NumeroCNIDestinataire",
        label: "Numero CNI Dest",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
      {
        name: "NomExpediteur",
        label: "Nom expéditeur",
        type: "text",
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
      {
        name: "NumeroCNIExpediteur",
        label: "Numero CNI Exp",
        type: "number",
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
      {
        name: "id_user",
        label: "Utlisateur",
        type: "select",
        options: [
          { label: "User", value: 1 }
        ],
        classparent: "",
        customclass: "",
        classlabel: "",
      }, 
    ];

    return form;
  }

  async getOptionsFilterOpCaisse(): Promise<OptionsFilterOpCaisse | undefined> {
    try {
      interface SelectOpCaisse {
        site: SelectDataOption[];
        partenaire: SelectDataOption[];
        prestation: SelectDataOption[];
      }
      const response = await this.getDataSelectTable<SelectOpCaisse>([
        "site",
        "partenaire",
        "prestation",
      ]);

      return {
        sites: response.site,
        partenaires: response.partenaire,
        prestations: response.prestation,
      };
    } catch (error) {
      return undefined;
    }
  }
}