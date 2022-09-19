import { Checkbox, Divider } from '@/common/components';
import { CheckboxGroup, CheckboxGroupOption } from '@/common/headless';
import { useCategories } from '@/feed/useCategories';
import { groupBy } from 'lodash-es';

export type CategoriesTabProps = {
  keyWord: string;
};

export const CategoriesTab = ({ keyWord }: CategoriesTabProps) => {
  const { categories } = useCategories();

  const categoriesGroupedByAlphabet = groupBy(categories, ({ name }) =>
    /[0-9]/.test(name[0]) ? '#' : name[0],
  );

  return (
    <div className="space-y-8">
      {Object.entries(categoriesGroupedByAlphabet).map(([character, category]) => (
        <div key={character}>
          <h3 className="font-semibold text-sm">{character}</h3>
          <Divider className="my-2" />
          <CheckboxGroup>
            <div className="grid grid-cols-2 gap-2 text-Gray-3">
              {category
                .filter((item) => item.name.toLowerCase().includes(keyWord.toLowerCase()))
                .map(({ id, name }) => (
                  <CheckboxGroupOption value={id.toString()} key={id}>
                    {({ handleChange, isChecked, value }) => (
                      <Checkbox
                        onChange={handleChange}
                        checked={isChecked}
                        value={value}
                        label={name}
                      />
                    )}
                  </CheckboxGroupOption>
                ))}
            </div>
          </CheckboxGroup>
        </div>
      ))}
    </div>
  );
};
