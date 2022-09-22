export enum UserRole {
  ADMIN = 'Admin',
}

export enum ProtectedFeatures {
  HideCategory = 'HideCategory',
}

export const UserPermissions = Object.freeze({
  [ProtectedFeatures.HideCategory]: [UserRole.ADMIN],
});
