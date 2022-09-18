import { Checkbox, OverlayLoader, Table } from '@/common/components';
import { CheckboxGroup, CheckboxGroupOption } from '@/common/headless';
import { ClassName } from '@/common/types';
import { useUsers } from '@/profile/useUsers';
import clsx from 'clsx';
import { useEffect } from 'react';

type HeaderItem = { label: string };

const headers: HeaderItem[] = [
  { label: '' },
  { label: 'Name' },
  { label: 'Title' },
  { label: 'Team' },
  { label: 'Role' },
].filter((item): item is HeaderItem => !!item);

export type MembersTableProps = ClassName & {
  searchInput: string;
};

export const MembersTable = ({ className, searchInput }: MembersTableProps) => {
  const { users, isValidatingUsers } = useUsers();

  return (
    <div>
      <Table.OverflowContainer className={className} style={{ filter: 'none' }}>
        <OverlayLoader loading={isValidatingUsers}>
          <Table variant="noBorder">
            <Table.Body>
              <Table.Row>
                {headers.map(({ label }) => (
                  <Table.Header key={label}>{label}</Table.Header>
                ))}
              </Table.Row>
              <CheckboxGroup>
                {({ toggleValue }) =>
                  users
                    .filter(
                      (user) =>
                        user.fullName?.toLowerCase().includes(searchInput?.toLowerCase()) ||
                        user.department?.toLowerCase().includes(searchInput?.toLowerCase()),
                    )
                    .map(({ id, fullName, email, title, department }) => (
                      <CheckboxGroupOption key={id} value={id!.toString()}>
                        {({ isChecked, value }) => (
                          <Table.Row
                            className={clsx('relative cursor-pointer h-14', 'list-row-hover')}
                            onClick={() => toggleValue(value)}
                            variant="noBorder"
                          >
                            <Table.Cell>
                              <Checkbox value={value} checked={isChecked} />
                            </Table.Cell>
                            <Table.Cell>
                              <p className="text-Gray-3 font-medium">{fullName}</p>
                              <p>{email}</p>
                            </Table.Cell>
                            <Table.Cell>{title}</Table.Cell>
                            <Table.Cell>{department}</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                          </Table.Row>
                        )}
                      </CheckboxGroupOption>
                    ))
                }
              </CheckboxGroup>
            </Table.Body>
          </Table>
        </OverlayLoader>
      </Table.OverflowContainer>
    </div>
  );
};
