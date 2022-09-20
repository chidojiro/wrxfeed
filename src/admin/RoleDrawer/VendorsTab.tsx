import { Divider, Form, ListLoader } from '@/common/components';
import { ResettableCheckbox } from '@/common/components/ResettableCheckbox';
import { CheckboxGroupOption } from '@/common/headless';
import { Role, VisibilityConfig } from '@/role/types';
import { useAssignableVendors } from '@/role/useAssignableVendors';
import { groupBy } from 'lodash-es';
import { useFormContext } from 'react-hook-form';

export type VendorsTabProps = {
  keyWord: string;
};

export const VendorsTab = ({ keyWord }: VendorsTabProps) => {
  const { isInitializingAssignableVendors } = useAssignableVendors();

  const { getValues } = useFormContext<Role>();
  const { vendors = [] } = getValues();

  const filteredVendors = vendors.filter((item) =>
    item?.name?.toLowerCase().includes(keyWord?.toLowerCase()),
  );

  const vendorsGroupedByAlphabet = groupBy(filteredVendors, ({ name }) =>
    /[0-9]/.test(name![0]) ? '#' : name![0],
  );

  const vendorsGroupedById = groupBy(filteredVendors, 'id');

  return (
    <ListLoader loading={isInitializingAssignableVendors}>
      <div className="space-y-8">
        {Object.entries(vendorsGroupedByAlphabet).map(([character, vendorsByCurrentCharacter]) => (
          <div key={character}>
            <h3 className="font-semibold text-sm">{character}</h3>
            <Divider className="my-2" />
            <Form.HeadlessCheckboxGroup
              name="vendors"
              valueAs={(value: VisibilityConfig[]) =>
                value.filter(({ visible }) => visible).map(({ id }) => id.toString())
              }
              changeAs={(value: string[]) =>
                vendors.map((vendor) => ({
                  ...vendor,
                  visible: value.includes(vendor.id.toString()) ? true : false,
                }))
              }
            >
              <div className="grid grid-cols-2 gap-2 text-Gray-3">
                {vendorsByCurrentCharacter.map(({ id, name }) => (
                  <CheckboxGroupOption value={id.toString()} key={id}>
                    {({ handleChange, isChecked, value }) => (
                      <ResettableCheckbox
                        onChange={handleChange}
                        checked={isChecked}
                        value={value}
                        label={name}
                        resettable={isChecked !== vendorsGroupedById[id]?.[0].default}
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
