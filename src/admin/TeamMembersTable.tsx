import { Checkbox, OverlayLoader, Table } from '@/common/components';
import { CheckboxGroup, CheckboxGroupOption } from '@/common/headless';
import { ClassName } from '@/common/types';
import { useUsers } from '@/profile/useUsers';
import clsx from 'clsx';

type HeaderItem = { label: string; sortKey?: string };

const headers: HeaderItem[] = [
  { label: 'Name', sortKey: 'name' },
  { label: 'Title' },
  { label: 'Team' },
  { label: 'Role' },
].filter((item): item is HeaderItem => !!item);

export type TeamMembersTableProps = ClassName & {
  //
};

export const TeamMembersTable = ({ className }: TeamMembersTableProps) => {
  const { users, isValidatingUsers } = useUsers();

  return (
    <div className="border border-b-0 border-solid border-Gray-28 rounded-2xl overflow-hidden mt-4">
      <Table.OverflowContainer className={className} style={{ filter: 'none' }}>
        <OverlayLoader loading={isValidatingUsers}>
          <Table>
            <Table.Body>
              <Table.Row>
                {headers.map(({ label, sortKey }) => (
                  <Table.Header key={label} sortKey={sortKey}>
                    {label}
                  </Table.Header>
                ))}
              </Table.Row>
              {users.map(({ id, fullName, email, title, department }) => (
                <Table.Row
                  key={id}
                  className={clsx('relative cursor-pointer h-14', 'list-row-hover')}
                >
                  <Table.Cell>
                    <p className="text-Gray-3 font-medium">{fullName}</p>
                    <p>{email}</p>
                  </Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{department}</Table.Cell>
                  <Table.Cell>--</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </OverlayLoader>
      </Table.OverflowContainer>
    </div>
  );
};
