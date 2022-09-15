import { ArrowRightIcon, EditOutlineIcon } from '@/assets';
import { Button, Checkbox, Popover } from '@/common/components';
import { CheckboxGroup, CheckboxGroupOption } from '@/common/headless';
import { useControllableState, useDisclosure } from '@/common/hooks';
import { Option } from '@/common/types';
import clsx from 'clsx';
import { groupBy } from 'lodash-es';
import { Link } from 'react-router-dom';

export type RolesSelectProps = {
  roles: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

export const RolesSelect = ({ roles, value: valueProp, onChange }: RolesSelectProps) => {
  const [value, setValue] = useControllableState({ value: valueProp, onChange, defaultValue: [] });

  const rolesGroupedByValue = groupBy(roles, 'value');

  const isOpenDisclosure = useDisclosure();

  return (
    <CheckboxGroup value={value} onChange={setValue}>
      <div className="flex items-center gap-1">
        {value.map((v) => (
          <div
            key={v}
            className="rounded-full px-4 py-1 text-xs text-Gray-3 bg-Accent-5 font-semibold"
          >
            {rolesGroupedByValue[v][0]?.label}
          </div>
        ))}
        <Popover
          open={isOpenDisclosure.isOpen}
          onClose={isOpenDisclosure.close}
          placement="bottom-end"
          trigger={
            <Button
              onClick={isOpenDisclosure.open}
              className={clsx('p-1 border border-transparent', {
                'border border-dashed border-Gray-6 bg-Gray-12 rounded-full':
                  isOpenDisclosure.isOpen,
              })}
            >
              <EditOutlineIcon className="w-4 h-4 text-Gray-6" />
            </Button>
          }
        >
          <div className="py-1 rounded shadow-popover bg-white">
            {roles.map(({ label, value }) => (
              <label key={value} className="px-4 py-1.5 hover:bg-Gray-7 cursor-pointer block">
                <CheckboxGroupOption value={value}>
                  {({ handleChange, isChecked, value }) => (
                    <Checkbox
                      onChange={handleChange}
                      checked={isChecked}
                      value={value}
                      label={label}
                    />
                  )}
                </CheckboxGroupOption>
              </label>
            ))}
            <Link
              to="/admin/roles"
              className="px-4 py-1.5 hover:bg-Gray-7 text-xs text-Gray-6 flex items-center gap-2 border-t border-solid border-Gray-11"
            >
              Add custom role…
              <ArrowRightIcon className="w-4 h-4 text-Gray-2" />
            </Link>
          </div>
        </Popover>
      </div>
    </CheckboxGroup>
  );
};
