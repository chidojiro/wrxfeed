import { Divider, Form, ListLoader } from '@/common/components';
import { ResettableCheckbox } from '@/common/components/ResettableCheckbox';
import { CheckboxGroupOption } from '@/common/headless';
import { useAssignableCategories } from '@/role/useAssignableCategories';
import { groupBy } from 'lodash-es';
import { useFormContext } from 'react-hook-form';
import { Role, VisibilityConfig } from '@/role/types';

export type CategoriesTabProps = {
  keyWord: string;
};

export const CategoriesTab = ({ keyWord }: CategoriesTabProps) => {
  const { isInitializingAssignableCategories } = useAssignableCategories();

  const { getValues } = useFormContext<Role>();
  const { categories = [] } = getValues();

  const filteredCategories = categories.filter((item) =>
    item.name!.toLowerCase().includes(keyWord.toLowerCase()),
  );

  const categoriesGroupedByAlphabet = groupBy(filteredCategories, ({ name }) =>
    /[0-9]/.test(name![0]) ? '#' : name![0],
  );

  const categoriesGroupedById = groupBy(filteredCategories, 'id');

  return (
    <ListLoader loading={isInitializingAssignableCategories}>
      <div className="space-y-8">
        {Object.entries(categoriesGroupedByAlphabet).map(([character, category]) => (
          <div key={character}>
            <h3 className="font-semibold text-sm">{character}</h3>
            <Divider className="my-2" />
            <Form.HeadlessCheckboxGroup
              name="categories"
              valueAs={(value: VisibilityConfig[]) =>
                value.filter(({ visible }) => visible).map(({ id }) => id.toString())
              }
              changeAs={(value: string[]) =>
                categories.map((category) => ({
                  ...category,
                  visible: value.includes(category.id.toString()) ? true : false,
                }))
              }
            >
              <div className="grid grid-cols-2 gap-2 text-Gray-3">
                {category.map(({ id, name }) => (
                  <CheckboxGroupOption value={id.toString()} key={id}>
                    {({ handleChange, isChecked, value }) => (
                      <ResettableCheckbox
                        onChange={handleChange}
                        checked={isChecked}
                        value={value}
                        label={name}
                        resettable={isChecked !== categoriesGroupedById[id]?.[0].default}
                      />
                    )}
                  </CheckboxGroupOption>
                ))}
              </div>
            </Form.HeadlessCheckboxGroup>
          </div>
        ))}
      </div>
    </ListLoader>
  );
};
