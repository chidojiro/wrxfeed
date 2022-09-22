export enum UserRole {
  Base = 'Base',
  ADMIN = 'Admin',
}

export enum ProtectedFeatures {
  HideCategory = 'HideCategory',
  Invite = 'Invite',
}

export const UserPermissions = Object.freeze({
  [ProtectedFeatures.HideCategory]: [UserRole.ADMIN],
  [ProtectedFeatures.Invite]: [UserRole.ADMIN],
});
