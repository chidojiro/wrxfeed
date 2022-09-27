import { Checkbox, Divider, Form, ListLoader } from '@/common/components';
import { ResettableCheckbox } from '@/common/components/ResettableCheckbox';
import { CheckboxGroupOption } from '@/common/headless';
import { Department } from '@/main/entity';
import { VisibilityConfig } from '@/role/types';
import { useAssignableDepartments } from '@/role/useAssignableDepartments';
import { groupBy } from 'lodash-es';
import { useFormContext } from 'react-hook-form';

export type DepartmentsTabProps = {
  keyWord: string;
};

export const DepartmentsTab = ({ keyWord }: DepartmentsTabProps) => {
  const { assignableDepartments, isValidatingAssignableDepartments } = useAssignableDepartments();

  const { getValues, setValue } = useFormContext();

  const departments =
    (getValues('departments') as (VisibilityConfig & { children: Department[] })[]) ?? [];

  const departmentsGroupedById = groupBy(departments, 'id');

  const getChildrenIds = (id: number) =>
    departmentsGroupedById[id]?.[0].children?.map(({ id }) => id) ?? [];

  const getValueByRootDepartment = (id: number, value: VisibilityConfig[]) =>
    value
      .filter((item) => item.visible && getChildrenIds(id).includes(item.id))
      .map(({ id }) => id.toString());

  const setRootDepartmentVisible = (id: number, checked: boolean) =>
    setTimeout(() => {
      const departments =
        (getValues('departments') as (VisibilityConfig & { children: Department[] })[]) ?? [];

      const departmentsGroupedById = groupBy(departments, 'id');

      setValue('departments', [
        ...departments.filter((department) => department.id !== id),
        { ...departmentsGroupedById[id]?.[0], visible: checked },
      ]);
    }, 0);

  return (
    <ListLoader loading={isValidatingAssignableDepartments}>
      <div className="flex flex-col gap-8 text-Gray-3">
        {assignableDepartments
          .filter((department) => department.name!.toLowerCase().includes(keyWord?.toLowerCase()))
          .map(({ id, name, children }) => (
            <Form.HeadlessCheckboxGroup
              key={id}
              name="departments"
              onSelectionChange={
                children?.length
                  ? (selection) => setRootDepartmentVisible(id, selection === 'all')
                  : undefined
              }
              valueAs={(value: VisibilityConfig[]) => getValueByRootDepartment(id, value)}
              changeAs={(value: string[]) => [
                ...departments.filter((department) => !getChildrenIds(id).includes(department.id)),
                ...getChildrenIds(id).map((id) => ({
                  ...departmentsGroupedById[id]?.[0],
                  visible: value.includes(id.toString()) ? true : false,
                })),
              ]}
            >
              {({ selection, toggleSelectAll }) => {
                const isSelectAll = selection === 'all';
                const isSelectPartial = selection === 'partial';

                return (
                  <div>
                    {children?.length ? (
                      <Checkbox
                        label={name}
                        className="font-semibold"
                        colorScheme={
                          isSelectAll !== departmentsGroupedById[id]?.[0].default
                            ? 'accent'
                            : undefined
                        }
                        checked={!!children?.length ? isSelectAll : undefined}
                        partial={isSelectPartial}
                        onClick={!!children?.length ? toggleSelectAll : undefined}
                      />
                    ) : (
                      <Checkbox
                        className="font-semibold"
                        colorScheme={
                          departmentsGroupedById[id]?.[0].visible !==
                          departmentsGroupedById[id]?.[0].default
                            ? 'accent'
                            : undefined
                        }
                        label={name}
                        onChange={(e) => setRootDepartmentVisible(id, e.target.checked)}
                        checked={departmentsGroupedById[id]?.[0].visible}
                        value={id.toString()}
                      />
                    )}
                    <Divider className="my-2" />
                    <div className="flex flex-col gap-2 pl-7">
                      {children?.map(({ id, name }) => (
                        <CheckboxGroupOption key={id} value={id.toString()}>
                          {({ handleChange, isChecked, value }) => (
                            <ResettableCheckbox
                              resettable={isChecked !== departmentsGroupedById[id]?.[0].default}
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
                );
              }}
            </Form.HeadlessCheckboxGroup>
          ))}
      </div>
    </ListLoader>
  );
};
