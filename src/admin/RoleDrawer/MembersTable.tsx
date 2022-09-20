import { Checkbox, Form, ListLoader } from '@/common/components';
import { CheckboxGroupOption } from '@/common/headless';
import { ClassName } from '@/common/types';
import { useUsers } from '@/profile/useUsers';
import clsx from 'clsx';
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
};

export const MembersTable = ({ className, keyWord, isBase }: MembersTableProps) => {
  const { users, isInitializingUsers } = useUsers();

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
            valueAs={(value) => (isBase ? users.map(({ id }) => id?.toString()) : value)}
          >
            {({ toggleValue }) =>
              users
                .filter(
                  (user) =>
                    user.fullName?.toLowerCase().includes(keyWord?.toLowerCase()) ||
                    user.department?.name.toLowerCase().includes(keyWord?.toLowerCase()),
                )
                .map(({ id, fullName, email, title, department }) => (
                  <CheckboxGroupOption key={id} value={id!.toString()}>
                    {({ isChecked, value }) => (
                      <MembersTableRow
                        key={value}
                        data={[
                          <Checkbox key={value} value={value} checked={isChecked} />,
                          <>
                            <p className="text-Gray-3 font-semibold truncate">{fullName}</p>
                            <p className="truncate">{email}</p>
                          </>,
                          title,
                          department?.name,
                          '--',
                        ]}
                        onClick={() => toggleValue(value)}
                      />
                    )}
                  </CheckboxGroupOption>
                ))
            }
          </Form.HeadlessCheckboxGroup>
        </div>
      </div>
    </ListLoader>
  );
};
