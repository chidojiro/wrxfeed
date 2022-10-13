import { MoreVerticalIcon } from '@/assets';
import { OverlayLoader, StatusTag } from '@/common/components';
import { ApiErrorCode, isApiError, useErrorHandler } from '@/error';
import PopoverMenu from '@/main/atoms/PopoverMenu';
import PopoverMenuItem from '@/main/atoms/PopoverMenuItem';
import { Comment, FeedItem, TranStatus, Visibility } from '@/main/entity';
import { commentEditorRawParser, decimalLogic } from '@/main/utils';
import { useMentions } from '@/misc/useMentions';
import { useProfile } from '@/profile/useProfile';
import { getTransactionColorScheme, getTransactionLabel } from '@/team/TransactionList';
import { useDisclosure } from '@dwarvesf/react-hooks';
import { Menu } from '@headlessui/react';
import dayjs from 'dayjs';
import { EditorState } from 'draft-js';
import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FeedApis } from '../apis';
import { CreateFeedbackPayload } from '../types';
import { CommentBox } from './CommentBox';
import { CommentItem } from './CommentItem';
import { FeedBackModal } from './FeedBackModal';

const INITIAL_COMMENTS = 2;

export const TransactionFeedItemCard = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const errorHandler = useErrorHandler();
  const id = Number(params.id);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [lineItem, setLineItem] = useState<FeedItem>();
  const [feedback, setFeedback] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>();
  const { mentions } = useMentions();
  const { profile } = useProfile();

  const feedbackModalDisclosure = useDisclosure();

  const handleCopyFeedLink = () => {
    navigator.clipboard.writeText(`${window.location.host}/feed/item/${id}`);
    toast.success('Feed line item link has been copied');
  };

  const renderMenuItems = () => {
    const items = [];
    items.push(
      <PopoverMenuItem
        key="issue-with-this-item"
        value="issue-with-this-item"
        label="Issue With This Item"
        onClick={feedbackModalDisclosure.onOpen}
      />,
      <PopoverMenuItem
        key="copy-feed-link"
        value="copy-feed-link"
        label="Copy Link"
        onClick={handleCopyFeedLink}
      />,
    );
    return items;
  };

  const getFeedLineItem = useCallback(async () => {
    try {
      setLoading(true);
      const res = await FeedApis.getTransactionFeedItem(id);
      if (res.length > 0) {
        setLineItem(res[0]);
        const resCmt = await FeedApis.getComments(res[0].id, {
          order: 'DESC',
          offset: 0,
          limit: INITIAL_COMMENTS,
        });
        setComments(resCmt);
      }
    } catch (error: unknown) {
      if (isApiError(error)) {
        if (error.code === ApiErrorCode.Notfound) {
          history.push('/404');
        } else {
          toast.error(error.details?.message);
          errorHandler(error);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [errorHandler, history, id]);

  const onChangeTextContent = (content?: EditorState): void => {
    if (!content) return;
    const rawText = commentEditorRawParser(content.getCurrentContent());
    setFeedback(rawText);
  };

  const handleSubmitComment = async (id: number, payload: CreateFeedbackPayload) => {
    await FeedApis.createComment(id, payload);
    getFeedLineItem();
  };

  const isHidden =
    lineItem?.category !== null && lineItem?.category?.visibility === Visibility.HIDDEN;

  useEffect(() => {
    getFeedLineItem();
  }, [getFeedLineItem]);

  return (
    <>
      <OverlayLoader loading={isLoading}>
        <article className="bg-white flex flex-col filter shadow-md rounded-card overflow-hidden">
          <div className="flex flex-row">
            <div
              className="flex-grow h-3 border-b border-Gray-11"
              style={{
                background:
                  'linear-gradient(90.64deg, #60B6C1 0.34%, #61BFC2 20.62%, #60BBC2 40.08%, #4E88A3 65.42%, #5387AA 80.26%, #6C9AB8 98.34%, #7CB1E3 105.67%)',
              }}
            />
          </div>
          <div className="px-8 pt-3 pb-6">
            <div className="flex justify-between">
              <div className="space-y-1">
                <Link
                  className="flex items-center hover:underline"
                  to={`/vendors/${lineItem?.lineItem.vendor?.id}`}
                >
                  <p className="text-base font-bold text-primary">
                    {lineItem?.lineItem.vendor?.name}
                  </p>
                </Link>
                <p className="flex space-x-0.5 text-xs font-normal text-Gray-6">
                  <Link
                    className="flex items-center hover:underline"
                    to={`/departments/${lineItem?.lineItem.department?.id}`}
                  >
                    {lineItem?.lineItem.department?.name} ·
                  </Link>
                  <Link
                    className="flex items-center hover:underline"
                    to={`/categories/${lineItem?.lineItem.category?.id}`}
                  >
                    {' '}
                    {lineItem?.lineItem.category?.name} ·
                  </Link>
                  <span> {dayjs(lineItem?.lineItem.transDate).format('DD/MM/YY')}</span>
                </p>
              </div>
              <div className="flex space-x-3.5">
                <p className="text-lg leading-5 font-semibold text-primary">
                  {decimalLogic(lineItem?.lineItem.amountUsd, '$')}
                </p>
                <Menu as="div" className="relative inline-block z-20 text-left mt-0.5">
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <MoreVerticalIcon
                        className="fill-current text-Gray-3 path-no-filled"
                        aria-hidden="true"
                        viewBox="0 0 15 15"
                      />
                    </Menu.Button>
                  </div>
                  <PopoverMenu>{renderMenuItems()}</PopoverMenu>
                </Menu>
              </div>
            </div>
          </div>
          <div className="px-9 py-6 border-t border-b border-Gray-11">
            <div className="flex justify-between">
              <p className=" font-normal text-xs text-Gray-6">
                {lineItem?.lineItem.description}{' '}
                <span>
                  {` - ${
                    lineItem?.month &&
                    dayjs()
                      .month(lineItem?.month - 1)
                      .format('MMMM')
                  }`}
                </span>
              </p>
              <StatusTag
                colorScheme={getTransactionColorScheme(
                  lineItem?.lineItem.transStatus as TranStatus,
                )}
                className="h-5 text-xs font-medium"
              >
                {getTransactionLabel(lineItem?.lineItem.transStatus as TranStatus)}
              </StatusTag>
            </div>
          </div>
          <ul className="flex flex-col px-9 py-4">
            {comments?.map((comment) => (
              <li key={comment.id}>
                <CommentItem
                  className={isHidden ? 'bg-purple-11' : 'bg-Gray-24'}
                  comment={comment}
                  mentionData={mentions}
                  editable={profile?.id === comment.user.id}
                  isShowUserAva
                />
              </li>
            ))}
          </ul>
          <div className="pb-3 px-9">
            <CommentBox
              style={{ backgroundColor: 'white' }}
              showAttach={false}
              showEmoji={false}
              showSend={false}
              mentionData={mentions}
              alwaysFocus
              onChange={onChangeTextContent}
              onSubmit={() => handleSubmitComment(lineItem?.id as number, { content: feedback })}
            />
          </div>
        </article>
      </OverlayLoader>
      <FeedBackModal
        open={feedbackModalDisclosure.isOpen}
        onClose={feedbackModalDisclosure.onClose}
        itemId={id}
      />
    </>
  );
};
