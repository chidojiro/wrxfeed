import { MembersTable } from './MembersTable';

export type MembersTabProps = {
  keyWord: string;
  isBase?: boolean;
  isUpdate?: boolean;
  isCreate?: boolean;
};

export const MembersTab = ({ keyWord, isBase, isUpdate, isCreate }: MembersTabProps) => {
  return <MembersTable keyWord={keyWord} isBase={isBase} isUpdate={isUpdate} isCreate={isCreate} />;
};
