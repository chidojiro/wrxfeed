import { Checkbox, Divider, Form, ListLoader } from '@/common/components';
import { CheckboxGroupOption } from '@/common/headless';
import { ClassName } from '@/common/types';
import { User } from '@/profile/types';
import { useUsers } from '@/profile/useUsers';
import { Role } from '@/role/types';
import { useRole } from '@/role/useRole';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { MembersTableRow } from './MembersTableRow';

type HeaderItem = { label: string };

const headers: HeaderItem[] = [
  { label: '' },
  { label: 'Name' },
  { label: 'Title' },
  { label: 'Team' },
  { label: 'Role' },
].filter((item): item is HeaderItem => !!item);

export type MembersTableProps = ClassName & {
  keyWord: string;
  isBase?: boolean;
  isUpdate?: boolean;
};

export const MembersTable = ({ className, keyWord, isBase, isUpdate }: MembersTableProps) => {
  const { users, isInitializingUsers } = useUsers();

  const { getValues } = useFormContext<Role>();

  const role = getValues();

  const { role: originalRole } = useRole(role.id);

  if (!originalRole) return null;

  const { memberIds } = originalRole;

  const renderDataRow = (
    { id, fullName, email, title, department, roles }: User,
    onClick?: (value: string) => void,
  ) => (
    <CheckboxGroupOption key={id} value={id!.toString()}>
      {({ value }) => (
        <MembersTableRow
          key={value}
          data={[
            !!onClick ? <Checkbox key={value} value={value} /> : null,
            <>
              <p className="text-Gray-3 font-semibold truncate">{fullName}</p>
              <p className="truncate">{email}</p>
            </>,
            title,
            department?.name,
            roles.length ? roles.map(({ name }) => name).join(', ') : '--',
          ]}
          onClick={() => onClick?.(value)}
        />
      )}
    </CheckboxGroupOption>
  );

  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(keyWord?.toLowerCase()) ||
      user.department?.name.toLowerCase().includes(keyWord?.toLowerCase()),
  );

  return (
    <ListLoader loading={isInitializingUsers}>
      <div className={clsx('text-xs text-[#6B7280] h-full flex flex-col', className)}>
        <MembersTableRow
          data={headers.map(({ label }) => label)}
          className="border-b border-Gray-11"
        />
        <div className="overflow-auto flex-1 py-[1px]">
          <Form.HeadlessCheckboxGroup
            name="memberIds"
            valueAs={(value) =>
              isBase ? users.map(({ id }) => id?.toString()) : value.map(String)
            }
            changeAs={(value) => value.map(Number)}
          >
            {({ toggleValue }) => {
              if (isUpdate && !isBase) {
                const alreadyInThisRoleMembers = filteredUsers.filter((user) =>
                  memberIds.includes(user.id!),
                );

                const notInThisRoleMembers = filteredUsers.filter(
                  (user) => !memberIds.includes(user.id!),
                );

                return (
                  <div>
                    {!!alreadyInThisRoleMembers.length && (
                      <div className="py-3">
                        <p className="mb-5">Already in this role</p>
                        <div>{alreadyInThisRoleMembers.map((user) => renderDataRow(user))}</div>
                      </div>
                    )}
                    {!!alreadyInThisRoleMembers.length && !!notInThisRoleMembers.length && (
                      <Divider />
                    )}
                    {!!notInThisRoleMembers.length && (
                      <div className="py-3">
                        <p className="mb-5">Invite other team members</p>
                        <div>
                          {notInThisRoleMembers.map((user) => renderDataRow(user, toggleValue))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return filteredUsers.map((user) => renderDataRow(user, toggleValue));
            }}
          </Form.HeadlessCheckboxGroup>
        </div>
      </div>
    </ListLoader>
  );
};
