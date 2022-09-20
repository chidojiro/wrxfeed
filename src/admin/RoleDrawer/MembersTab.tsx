import { MembersTable } from './MembersTable';

export type MembersTabProps = {
  keyWord: string;
  isBase?: boolean;
};

export const MembersTab = ({ keyWord, isBase }: MembersTabProps) => {
  return <MembersTable keyWord={keyWord} isBase={isBase} />;
};
