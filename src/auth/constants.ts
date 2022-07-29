export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum ProtectedFeatures {
  HideCategory = 'HideCategory',
}

export const UserPermissions = Object.freeze({
  [ProtectedFeatures.HideCategory]: [UserRole.ADMIN],
});
