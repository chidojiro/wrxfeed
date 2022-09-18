import React from 'react';
import { MembersTable } from './MembersTable';

export type MembersTabProps = {
  searchInput: string;
};

export const MembersTab = ({ searchInput }: MembersTabProps) => {
  return <MembersTable searchInput={searchInput} />;
};
