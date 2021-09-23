export type Company = {
  id: number;
  name: string;
  logo?: string;
  domain?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
