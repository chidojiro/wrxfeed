import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useRecoilValue } from 'recoil';
import { profileState } from '@auth/containers/ProfileEditForm/states';
import { getNameAbbreviation } from '@main/utils';
import { useSetIdentity } from '@identity/hooks';
import { useApi } from '@api';
import UploadButton from '@common/atoms/UploadButton';
import { UPLOAD_FILE_ACCEPT } from '@src/config';
import { GetUploadTokenBody, UploadTypes } from '@api/types';
import { useFileUploader } from '@common/hooks/useFileUploader';
// import { useRefreshProfile } from '@auth/containers/ProfileEditForm/hooks';
import { toast } from 'react-toastify';

// export interface UploadableViewProps {
//   className: string;
// }
// const UploadableView: React.FC<UploadableViewProps> = ({ children, className }) => {
//   const onClickChangeAva = () => {
//     console.log('Check in onPressChangeAva');
//   };
//   return (
//     <button className={className} type="button" onClick={onClickChangeAva}>
//       {children}
//     </button>
//   );
// };

export interface UserProfilePopoverProps {
  style?: React.CSSProperties;
}

const UserProfilePopover: React.VFC<UserProfilePopoverProps> = ({ style }) => {
  const profile = useRecoilValue(profileState);
  // const [flag, refresh] = useRefreshProfile();
  const [uploadFileOptions, setUploadFileOptions] = React.useState<GetUploadTokenBody>();
  const [userAvatar, setAvatar] = React.useState<string>('');

  const setIdentity = useSetIdentity();
  const apiClient = useApi();
  const logout = React.useCallback(async () => {
    apiClient.logout();
    setIdentity(undefined);
  }, [setIdentity, apiClient]);

  const profileForms = [
    {
      title: 'Name',
      content: profile?.fullName || 'Update now',
    },
    {
      title: 'Title',
      content: profile?.title || 'Update now',
    },
    {
      title: 'Department',
      content: profile?.department || 'Update now',
    },
    {
      title: 'Email',
      content: profile?.email || 'Update now',
    },
  ];

  const renderAvatarIcon = () => {
    if (userAvatar !== '') {
      return <img className="h-8 w-8 rounded-full" src={userAvatar} alt="Ava" />;
    }
    const shortName = getNameAbbreviation(profile.fullName);
    return (
      <div className="flex h-8 w-8 rounded-full bg-purple-5 justify-center items-center">
        <div className="flex text-white text-xs font-semibold">{shortName}</div>
      </div>
    );
  };

  const onUploadSuccess = (url: string) => {
    console.log(`Check onUploadSuccess url = ${url}`);
    setAvatar(url);
    toast.success('Upload image successfully!');
    // const uriFull = url;
    // refresh();
  };

  const { isUploading, uploadFile } = useFileUploader({
    onSuccess: onUploadSuccess,
  });

  React.useEffect(() => {
    console.log('Check new isUploading =', isUploading);
  }, [isUploading]);

  React.useEffect(() => {
    setAvatar(profile?.avatar || '');
  }, [profile]);

  const handleAttachFile = (file: File) => {
    setUploadFileOptions({
      filename: `${profile.id}-${Date.now()}-${file.name}`,
      contentType: file.type,
      uploadType: UploadTypes.Attachments,
    });
    uploadFile(file, uploadFileOptions);
  };

  const onFileSelected = (file: File | null) => {
    // useFileUploader.tsx
    console.log('Check onFileSelected file = ', file);
    if (file) {
      handleAttachFile(file);
    }
  };

  const renderAvatarEditable = () => {
    if (userAvatar !== '') {
      return (
        <UploadButton
          className="flex group relative h-36 w-36 rounded-full self-center mt-6 bg-purple-5 justify-center items-center"
          id="button-file-avatar"
          accept={UPLOAD_FILE_ACCEPT}
          onFileSelected={onFileSelected}
        >
          <img alt="user-avatar" className="flex w-36 h-36 rounded-full" src={userAvatar} />
          <div className="flex absolute group-hover:bg-blue-upload w-full h-full rounded-full justify-center items-center">
            <div className="flex opacity-0 text-white group-hover:opacity-100 text-lg font-semibold">
              Edit Photo
            </div>
          </div>
        </UploadButton>
      );
    }
    const shortName = getNameAbbreviation(profile?.fullName);
    return (
      <UploadButton
        className="flex group relative h-36 w-36 rounded-full self-center mt-6 bg-purple-5 justify-center items-center"
        id="button-file-avatar"
        accept={UPLOAD_FILE_ACCEPT}
        onFileSelected={onFileSelected}
      >
        <div className="flex text-white font-semibold text-2xl opacity-100 group-hover:opacity-0">
          {shortName}
        </div>
        <div className="flex absolute group-hover:bg-blue-upload w-full h-full rounded-full justify-center items-center">
          <div className="flex text-white opacity-0 group-hover:opacity-100 text-lg font-semibold">
            Edit Photo
          </div>
        </div>
      </UploadButton>
    );
  };

  const renderLogout = () => {
    return (
      <div className="flex py-4 items-center flex-col">
        <button type="button" className="flex text-red-500 font-medium" onClick={logout}>
          Logout
        </button>
      </div>
    );
  };

  return (
    <Popover as="div" className="flex-shrink-0 relative" style={style}>
      <Popover.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
        {renderAvatarIcon()}
      </Popover.Button>
      <Popover.Panel className="absolute z-50">
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            style={{ width: '332px' }}
            className="flex flex-col origin-top-right absolute z-10 right-0 mt-4 shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none bg-white"
          >
            <div className="flex flex-row items-center h-16 w-full border-b-2 px-8">
              <p className="flex text-gray-1 font-medium">Profile</p>
            </div>
            {renderAvatarEditable()}
            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col px-11 pt-4">
                {profileForms.map((item) => {
                  return (
                    <div key={`profileInfos${item.title}`} className="flex flex-col mt-2">
                      <div className="flex text-sm text-gray-1 font-medium">{item.title}</div>
                      <div className="flex flex-row items-center px-1 py-4 h-10">
                        <p className="flex text-sm text-Gray-6">{item.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {renderLogout()}
          </div>
        </Transition>
      </Popover.Panel>
    </Popover>
  );
};

export default UserProfilePopover;
