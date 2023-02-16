import {
  CategoryIcon,
  EditIcon,
  EyeIcon,
  PlusCircleSolidIcon,
  TeamIcon,
  TickCircleSolidIcon,
  VendorIcon,
} from '@/assets';
import { Avatar, Divider, Menu, Tag } from '@/common/components';
import { useDisclosure, useHandler } from '@/common/hooks';
import { distanceToNow } from '@/common/utils';
import { useSubscribe } from '@/subscription/useSubscribe';
import { useSubscription } from '@/subscription/useSubscription';
import { useUnsubscribe } from '@/subscription/useUnsubscribe';
import { TrashIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { InsightApis } from './apis';
import { InsightFeedItem } from './types';

export type InsightCardActionMenuProps = {
  feed: InsightFeedItem;
  onDeleteSuccess?: () => void;
};

export const InsightCardActionMenu = ({
  feed: { insight },
  onDeleteSuccess,
}: InsightCardActionMenuProps) => {
  const {
    id,
    updatedAt,
    props,
    creator: { fullName, avatar },
  } = insight;

  const vendorProps = props.filter(({ type }) => type === 'VENDOR');
  const departmentProps = props.filter(({ type }) => type === 'DEPARTMENT');
  const categoryProps = props.filter(({ type }) => type === 'CATEGORY');

  const viewDetailsDisclosure = useDisclosure();

  const { handle: deleteInsight } = useHandler(() => InsightApis.delete(id), {
    onSuccess: onDeleteSuccess,
  });

  const { subscription } = useSubscription();
  const { subscribe } = useSubscribe();
  const { unsubscribe } = useUnsubscribe();

  const isFollowing = subscription?.insights?.find((insight) => insight.id === id);

  return (
    <Menu placement="bottom-end" onClose={viewDetailsDisclosure.close}>
      {viewDetailsDisclosure.isOpen ? (
        <div className="py-5 px-4 shadow-card w-[300px] bg-white max-h-[300px] overflow-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <Avatar src={avatar} fullName="fullName" size="md" />
            <div>
              <h4 className="font-bold text-xs">{fullName}</h4>
              <p className="text-Gray-6 text-xs">Last edited {distanceToNow(updatedAt)}</p>
            </div>
          </div>
          {!!props.length && (
            <div className="mt-4">
              <h5 className="font-bold text-xs">Properties</h5>
              <div className="flex gap-2 mt-2 flex-wrap">
                {vendorProps.map(({ id, name }) => (
                  <Tag icon={<VendorIcon />} key={id} colorScheme="orange">
                    {name}
                  </Tag>
                ))}
                {categoryProps.map(({ id, name }) => (
                  <Tag icon={<CategoryIcon />} key={id} colorScheme="accent">
                    {name}
                  </Tag>
                ))}
                {departmentProps.map(({ id, name }) => (
                  <Tag icon={<TeamIcon />} key={id} colorScheme="cyan">
                    {name}
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
            closeOnClick={false}
            className="w-[145px]"
            leftIcon={<EyeIcon width={16} height={16} />}
          >
            View Details
          </Menu.Item>
          <Link to={`/insights/${id}`}>
            <Menu.Item leftIcon={<EditIcon width={16} height={16} />}>Edit Insight</Menu.Item>
          </Link>
          {!isFollowing ? (
            <Menu.Item
              leftIcon={<PlusCircleSolidIcon />}
              onClick={() => subscribe('insights', [insight])}
            >
              Follow
            </Menu.Item>
          ) : (
            <Menu.Item
              leftIcon={<TickCircleSolidIcon width={16} height={16} className="text-Green-400" />}
              onClick={() => unsubscribe('insights', [insight])}
            >
              Following
            </Menu.Item>
          )}
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
