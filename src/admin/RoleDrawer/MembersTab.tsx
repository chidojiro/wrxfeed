import { MembersTable } from './MembersTable';

export type MembersTabProps = {
  keyWord: string;
  isBase?: boolean;
  isUpdate?: boolean;
};

export const MembersTab = ({ keyWord, isBase, isUpdate }: MembersTabProps) => {
  return <MembersTable keyWord={keyWord} isBase={isBase} isUpdate={isUpdate} />;
};
