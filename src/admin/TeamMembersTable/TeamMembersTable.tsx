import { Table } from '@/common/components';
import { useHandler } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { User } from '@/profile/types';
import { RoleApis } from '@/role/apis';
import clsx from 'clsx';
import React from 'react';
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
};

export const TeamMembersTable = ({ className, users }: TeamMembersTableProps) => {
  const [sort, setSort] = React.useState<string>();
  const { handle: handleUpdateAssignedRoles } = useHandler((userId: number, roleIds: number[]) =>
    RoleApis.updateAssigned(userId, { roleIds }),
  );

  const sortedUsers = users.sort((a, b) => {
    if (!sort) return 0;

    if (sort?.startsWith('-')) {
      if (a.fullName! > b.fullName!) return -1;
      return 1;
    }

    if (a.fullName! > b.fullName!) return 1;
    return -1;
  });

  return (
    <div className="border border-b-0 border-solid border-Gray-28 rounded-2xl overflow-hidden mt-4">
      <Table.OverflowContainer className={className} style={{ filter: 'none' }}>
        <Table onSortChange={setSort} sort={sort}>
          <Table.Body>
            <Table.Row>
              {headers.map(({ label, sortKey }) => (
                <Table.Header key={label} sortKey={sortKey}>
                  {label}
                </Table.Header>
              ))}
            </Table.Row>
            {sortedUsers.map(({ id, fullName, email, title, department, roles }) => {
              return (
                <Table.Row key={id} className={clsx('relative h-14')}>
                  <Table.Cell>
                    <p className="text-Gray-3 font-medium">{fullName}</p>
                    <p>{email}</p>
                  </Table.Cell>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{department?.name}</Table.Cell>
                  <Table.Cell>
                    <RolesSelect
                      className="w-[180px]"
                      defaultValue={roles.map(({ id }) => id.toString())}
                      onChange={(value) => handleUpdateAssignedRoles(id, value.map(Number))}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.OverflowContainer>
    </div>
  );
};
