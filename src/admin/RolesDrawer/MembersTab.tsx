import { MembersTable } from './MembersTable';

export type MembersTabProps = {
  keyWord: string;
};

export const MembersTab = ({ keyWord }: MembersTabProps) => {
  return <MembersTable keyWord={keyWord} />;
};
