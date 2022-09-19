import { Checkbox, Divider } from '@/common/components';
import { CheckboxGroup, CheckboxGroupOption } from '@/common/headless';
import { useDepartmentsHierarchy } from '@/team/useDepartmentsHierarchy';

export type TeamsTabProps = {
  keyWord: string;
};

export const TeamsTab = ({ keyWord }: TeamsTabProps) => {
  const { departmentsHierarchy } = useDepartmentsHierarchy();

  return (
    <div className="flex flex-col gap-8 text-Gray-3">
      {departmentsHierarchy
        .filter((department) => department.name.toLowerCase().includes(keyWord?.toLowerCase()))
        .map(({ id, name, children }) => (
          <CheckboxGroup key={id}>
            {({ selection, toggleSelectAll }) => (
              <div>
                <Checkbox
                  label={name}
                  className="font-semibold"
                  checked={selection === 'all'}
                  partial={selection === 'partial'}
                  onClick={toggleSelectAll}
                />
                <Divider className="my-2" />
                <div className="flex flex-col gap-2 pl-7">
                  {children?.map(({ id, name }) => (
                    <CheckboxGroupOption key={id} value={id.toString()}>
                      {({ handleChange, isChecked, value }) => (
                        <Checkbox
                          label={name}
                          onChange={handleChange}
                          checked={isChecked}
                          value={value}
                        />
                      )}
                    </CheckboxGroupOption>
                  ))}
                </div>
              </div>
            )}
          </CheckboxGroup>
        ))}
    </div>
  );
};
