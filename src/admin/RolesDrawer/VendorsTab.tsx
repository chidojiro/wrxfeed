import { Checkbox, Divider } from '@/common/components';
import { CheckboxGroup, CheckboxGroupOption } from '@/common/headless';
import { useVendors } from '@/vendor/useVendors';
import { groupBy } from 'lodash-es';
import React from 'react';

export type VendorsTabProps = {
  searchInput: string;
};

export const VendorsTab = ({ searchInput }: VendorsTabProps) => {
  const { vendors } = useVendors();

  const vendorsGroupedByAlphabet = groupBy(vendors, ({ name }) =>
    /[0-9]/.test(name[0]) ? '#' : name[0],
  );

  return (
    <div className="space-y-8">
      {Object.entries(vendorsGroupedByAlphabet).map(([character, category]) => (
        <div key={character}>
          <h3 className="font-semibold text-sm">{character}</h3>
          <Divider className="my-2" />
          <CheckboxGroup>
            <div className="grid grid-cols-2 gap-2 text-Gray-3">
              {category
                .filter((item) => item.name.toLowerCase().includes(searchInput?.toLowerCase()))
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
