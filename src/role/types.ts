export type CreateRolePayload = {
  name: string;
  description: string;
  departments: { id: number; visible: boolean; useDefault: boolean }[];
  categories: { id: number; visible: boolean; useDefault: boolean }[];
  vendors: { id: number; visible: boolean; useDefault: boolean }[];
  memberIds: string[];
};

export type UpdateRolePayload = CreateRolePayload;

export type GetRolesParams = {
  //
};

export type VisibilityConfig = {
  id: number;
  visible: boolean;
  default: boolean;
  resettable: boolean;
  name?: string;
};

export type Role = {
  id: number;
  name: string;
  description: string;
  categories: VisibilityConfig[];
  departments: VisibilityConfig[];
  vendors: VisibilityConfig[];
  memberIds: number[];
};
