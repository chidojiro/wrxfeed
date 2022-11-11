export enum UserRole {
  ADMIN = 'Admin',
  EMPLOYEE = 'Gravity Employees',
}

export enum ProtectedFeatures {
  HideCategory = 'HideCategory',
  Invite = 'Invite',
}

export const UserPermissions = Object.freeze({
  [ProtectedFeatures.HideCategory]: [UserRole.ADMIN],
  [ProtectedFeatures.Invite]: [UserRole.ADMIN],
});
