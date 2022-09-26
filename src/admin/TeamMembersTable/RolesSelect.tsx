import { ArrowRightIcon, EditOutlineIcon } from '@/assets';
import { Button, Checkbox, Popover } from '@/common/components';
import { CheckboxGroup, CheckboxGroupOption } from '@/common/headless';
import { useControllableState, useDisclosure } from '@/common/hooks';
import { ClassName } from '@/common/types';
import { useRoles } from '@/role/useRoles';
import clsx from 'clsx';
import { groupBy } from 'lodash-es';
import { Link } from 'react-router-dom';

export type RolesSelectProps = ClassName & {
  value?: string[];
  onChange?: (value: string[]) => void;
  defaultValue?: string[];
  disabled?: boolean;
};

export const RolesSelect = ({
  value: valueProp,
  onChange,
  defaultValue = [],
  className,
  disabled,
}: RolesSelectProps) => {
  const [value, setValue] = useControllableState({ value: valueProp, onChange, defaultValue });
  const { roles } = useRoles();
  const selectableRoles = roles.filter((role) => !!role.id);
  const rolesGroupedById = groupBy(selectableRoles, 'id');
  const isOpenDisclosure = useDisclosure();

  return (
    <CheckboxGroup value={value} onChange={setValue}>
      <div className={clsx('flex items-center gap-1', className)}>
        <div className="flex flex-wrap gap-1">
          {value.map((v) => (
            <div
              key={v}
              className="rounded-full px-4 py-1 text-xs text-Gray-3 bg-Accent-5 font-semibold"
            >
              {rolesGroupedById[v]?.[0]?.name}
            </div>
          ))}
        </div>
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
            {selectableRoles.map(({ id, name }) => (
              <label key={id} className="px-4 py-1.5 hover:bg-Gray-7 cursor-pointer block">
                <CheckboxGroupOption value={id.toString()}>
                  {({ handleChange, isChecked, value }) => (
                    <Checkbox
                      checked={isChecked}
                      disabled={disabled}
                      value={value}
                      onChange={handleChange}
                      label={name}
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
