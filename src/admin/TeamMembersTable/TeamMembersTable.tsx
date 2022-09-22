import { OverlayLoader, Table } from '@/common/components';
import { ClassName } from '@/common/types';
import { User } from '@/profile/types';
import { useUsers } from '@/profile/useUsers';
import clsx from 'clsx';
import { RolesSelect } from './RolesSelect';

type HeaderItem = { label: string; sortKey?: string };

const headers: HeaderItem[] = [
  { label: 'Name', sortKey: 'name' },
  { label: 'Title' },
  { label: 'Team' },
  { label: 'Role' },
].filter((item): item is HeaderItem => !!item);

export type TeamMembersTableProps = ClassName & {
  users: User[];
  isLoading: boolean;
};

export const TeamMembersTable = ({ className, users, isLoading }: TeamMembersTableProps) => {
  return (
    <div className="border border-b-0 border-solid border-Gray-28 rounded-2xl overflow-hidden mt-4">
      <Table.OverflowContainer className={className} style={{ filter: 'none' }}>
        <OverlayLoader loading={isLoading}>
          <Table>
            <Table.Body>
              <Table.Row>
                {headers.map(({ label, sortKey }) => (
                  <Table.Header key={label} sortKey={sortKey}>
                    {label}
                  </Table.Header>
                ))}
              </Table.Row>
              {users.map(({ id, fullName, email, title, department, roles }) => {
                const selectRoles = roles.map((role) => {
                  return {
                    label: role.name,
                    value: role.id.toString(),
                  };
                });
                return (
                  <Table.Row key={id} className={clsx('relative h-14')}>
                    <Table.Cell>
                      <p className="text-Gray-3 font-medium">{fullName}</p>
                      <p>{email}</p>
                    </Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                    <Table.Cell>{department?.name}</Table.Cell>
                    <Table.Cell>
                      <RolesSelect roles={selectRoles} />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </OverlayLoader>
      </Table.OverflowContainer>
    </div>
  );
};
