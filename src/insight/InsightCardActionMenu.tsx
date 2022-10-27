import { CategoryIcon, EditIcon, EyeIcon, TeamIcon, VendorIcon } from '@/assets';
import { useCategories } from '@/category/useCategories';
import { Avatar, Divider, Menu, Tag } from '@/common/components';
import { useDisclosure, useHandler } from '@/common/hooks';
import { distanceToNow } from '@/common/utils';
import { useDepartments } from '@/team/useDepartments';
import { useVendors } from '@/vendor/useVendors';
import { TrashIcon } from '@heroicons/react/outline';
import { groupBy } from 'lodash-es';
import React from 'react';
import { Link } from 'react-router-dom';
import { InsightApis } from './apis';
import { InsightFeedItem } from './types';

export type InsightCardActionMenuProps = {
  feed: InsightFeedItem;
  onDeleteSuccess?: () => void;
};

export const InsightCardActionMenu = ({
  feed: {
    insight: {
      id,
      updatedAt,
      props,
      creator: { fullName, avatar },
    },
  },
  onDeleteSuccess,
}: InsightCardActionMenuProps) => {
  const { departments } = useDepartments();
  const { vendors } = useVendors();
  const { categories } = useCategories();

  const departmentsGroupedById = groupBy(departments, 'id');
  const vendorsGroupedById = groupBy(vendors, 'id');
  const categoriesGroupedById = groupBy(categories, 'id');

  const vendorProps = props.filter(({ type }) => type === 'VENDOR');
  const departmentProps = props.filter(({ type }) => type === 'DEPARTMENT');
  const categoryProps = props.filter(({ type }) => type === 'CATEGORY');

  const viewDetailsDisclosure = useDisclosure();

  const { handle: deleteInsight } = useHandler(() => InsightApis.delete(id), {
    onSuccess: onDeleteSuccess,
  });

  return (
    <Menu placement="bottom-end" onClose={viewDetailsDisclosure.close}>
      {viewDetailsDisclosure.isOpen ? (
        <div className="py-5 px-4 shadow-card w-[300px] bg-white max-h-[300px] overflow-auto">
          <div className="flex items-center gap-2">
            <Avatar src={avatar} fullName="fullName" size="md" />
            <div>
              <h4 className="font-bold text-xs">{fullName}</h4>
              <p className="text-Gray-6 text-xs">Last edited {distanceToNow(updatedAt)}</p>
            </div>
          </div>
          {!!props.length && (
            <div className="mt-4">
              <h5 className="font-bold text-xs">Properties</h5>
              <div className="flex gap-2 mt-2">
                {vendorProps.map(({ id }) => (
                  <Tag icon={<VendorIcon />} key={id} colorScheme="orange">
                    {vendorsGroupedById[id][0].name}
                  </Tag>
                ))}
                {categoryProps.map(({ id }) => (
                  <Tag icon={<CategoryIcon />} key={id} colorScheme="accent">
                    {categoriesGroupedById[id][0].name}
                  </Tag>
                ))}
                {departmentProps.map(({ id }) => (
                  <Tag icon={<TeamIcon />} key={id} colorScheme="accent">
                    {departmentsGroupedById[id][0].name}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <Menu.Item
            onClick={viewDetailsDisclosure.open}
            className="w-[145px]"
            leftIcon={<EyeIcon width={16} height={16} />}
          >
            View Details
          </Menu.Item>
          <Link to={`/insights/${id}`}>
            <Menu.Item leftIcon={<EditIcon width={16} height={16} />}>Edit Insight</Menu.Item>
          </Link>
          <Divider />
          <Menu.Item
            onClick={deleteInsight}
            leftIcon={<TrashIcon width={16} height={16} className="text-danger" />}
          >
            Delete Insight
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
