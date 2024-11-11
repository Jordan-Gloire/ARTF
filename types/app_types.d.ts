//type générique
export interface DefaultAppRowTypeInterface {
  id: number;
  uuid: number;
  created_at: string;
  updated_at: string;
}

export type ValueTypeDataRow =
  | string
  | number
  | { id: number | string; [key: string]: string | number };

export type ExtendedRowType<T extends DefaultAppRowTypeInterface> = {
  [K in keyof T]: ValueTypeDataRow;
} & {
  [key: string]: ValueTypeDataRow;
};

//administration
export interface AdministrationInterface {
  id: number | string;
  uuid: string;
  nom: string;
  sigle: string;
  path_logo?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

// Op caisse
export interface OpCaisseInterface {
  id: number | string;
  libelle: string;
  desc: string;
}

export interface OptionsFilterOpCaisse {
  sites: SelectDataOption[];
  partenaires: SelectDataOption[];
  prestations: SelectDataOption[];
}

export interface SelectDataOption {
  value: string;
  label: string;
}
//

//role
export type Role = { read: boolean; write: boolean; delete: boolean };
export interface RoleServiceInterface {
  nom_role: string;
  json_code: UserRoleInterface;
}
export interface UserRoleInterface {
  administraions: Role;
  prestations: Role;
  roles: Role;
  partenaires: Role;
  users: Role;
  sites: Role;
  "cout-prestations": Role;
  [key: string]: Role;
}
