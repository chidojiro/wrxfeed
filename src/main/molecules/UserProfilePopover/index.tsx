import { AuthApis } from '@/auth/apis';
import Loading from '@/common/atoms/Loading';
import UploadButton from '@/common/atoms/UploadButton';
import { Avatar, Button } from '@/common/components';
import { useFileUploader } from '@/common/hooks/useFileUploader';
import { UPLOAD_FILE_ACCEPT } from '@/config';
import { getNameAbbreviation } from '@/main/utils';
import { GetUploadFileTokenPayload } from '@/media/types';
import { ProfileApis } from '@/profile/apis';
import { useProfile } from '@/profile/useProfile';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { toast } from 'react-toastify';

export interface UserProfilePopoverProps {
  style?: React.CSSProperties;
}

export type ProfileChanges = {
  key: string;
  value: string;
};

const UserProfilePopover: React.FC<UserProfilePopoverProps> = ({ style }) => {
  const [uploadFileOptions, setUploadFileOptions] = React.useState<GetUploadFileTokenPayload>();
  const [userAvatar, setAvatar] = React.useState<string>('');
  const [changeData, setChangeData] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const { profile, mutateProfile } = useProfile();

  const logout = async () => {
    await AuthApis.logout();
  };

  const profileForms = [
    {
      title: 'Name',
      content: profile?.fullName || 'Unknown',
      onChange: () => null,
      editable: false,
    },
    {
      title: 'Title',
      content: profile?.title || 'Unknown',
      onChange: (text: string) => {
        setTitle(text);
      },
      editable: false,
    },
    {
      title: 'Email',
      content: profile?.email || 'Unknown',
      onChange: () => null,
      editable: false,
    },
  ];

  const renderAvatarIcon = () => {
    if (userAvatar !== '') {
      return <Avatar size="md" src={userAvatar} fullName={profile?.fullName as string} />;
    }
    const shortName = getNameAbbreviation(profile?.fullName);
    return (
      <div className="flex h-8 w-8 rounded-full bg-purple-5 justify-center items-center">
        <div className="flex text-white text-xs font-semibold">{shortName}</div>
      </div>
    );
  };

  const updateAvatar = async (avatarUri: string) => {
    const updates = {
      companyName: profile?.company?.name || '',
      title: profile?.title || '',
      department: profile?.department || '',
      bio: profile?.bio || '',
      lastLoginAt: profile?.lastLoginAt || '',
      avatar: avatarUri,
    };
    await ProfileApis.update(updates);
    toast.success('Upload image successfully!');
    mutateProfile({
      ...profile,
      avatar: avatarUri,
    });
  };

  const onUploadSuccess = (url: string) => {
    setAvatar(url);
    updateAvatar(url);
  };

  const { isUploading, uploadFile } = useFileUploader({
    onSuccess: onUploadSuccess,
  });

  React.useEffect(() => {
    setAvatar(profile?.avatar || '');
  }, [profile]);

  const handleAttachFile = (file: File) => {
    setUploadFileOptions({
      filename: `${profile?.id}-${Date.now()}-${file.name}`,
      contentType: file.type,
      uploadType: 'attachments',
    });
    uploadFile(file, uploadFileOptions);
  };

  const onFileSelected = (file: File | null) => {
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
            {!isUploading && (
              <div className="flex opacity-0 text-white group-hover:opacity-100 text-sm font-semibold">
                Edit Photo
              </div>
            )}
            {isUploading ? <Loading width={25} height={25} className="border-white" /> : null}
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
          {!isUploading && (
            <div className="flex text-white opacity-0 group-hover:opacity-100 text-sm font-semibold">
              Edit Photo
            </div>
          )}
          {isUploading ? <Loading width={25} height={25} className="border-white" /> : null}
        </div>
      </UploadButton>
    );
  };

  const onClickSaveChange = async () => {
    setLoading(true);
    const updates = {
      companyName: profile?.company?.name || '',
      title: title || profile?.title,
      // department: department || profile?.department,
      bio: profile?.bio || '',
      lastLoginAt: profile?.lastLoginAt || '',
    };
    await ProfileApis.update(updates);
    setLoading(false);
    toast.success("Update your's profile info successfully!");
    setChangeData(false);

    const userProfile = await ProfileApis.get();
    mutateProfile(userProfile);
  };

  const renderLogoutOrSaveChanges = () => {
    if (changeData) {
      return (
        <div className="flex py-4 items-center flex-row self-center">
          <div className="px-6 py-2 rounded-full hover:bg-gray-100">
            <Button className="flex text-blue-500 font-medium" onClick={onClickSaveChange}>
              Save changes
            </Button>
          </div>
          {!!loading && <Loading width={25} height={25} className="border-white mx-4" />}
        </div>
      );
    }
    return (
      <div className="flex py-4 flex-col items-center">
        <div className="px-6 py-2 rounded-full hover:bg-gray-100">
          <Button className="flex text-red-500 font-medium" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Popover as="div" className="flex-shrink-0 relative" style={style}>
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              'bg-white rounded-full flex focus:outline-none',
              open ? 'ring-2 ring-offset-2 ring-rose-500' : '',
            )}
          >
            {renderAvatarIcon()}
          </Popover.Button>
          <Popover.Panel className="absolute z-50">
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div
                style={{ width: '332px' }}
                className="flex flex-col origin-top-left absolute z-10 -right-8 mt-3 shadow-dropdown py-1 focus:outline-none bg-white"
              >
                <div className="flex flex-row items-center h-16 w-full border-b-2 px-8">
                  <p className="flex text-gray-1 font-medium">Profile</p>
                </div>
                {renderAvatarEditable()}
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-1 flex-col px-8 pt-4">
                    {profileForms.map((item) => {
                      const { onChange, editable } = item;
                      return (
                        <div key={`profileInfos-${item.title}`} className="flex flex-col mt-2">
                          <div className="flex text-sm text-gray-1 font-medium">{item.title}</div>
                          <div className="flex w-full flex-row items-center py-4 h-10 overflow-hidden">
                            <input
                              className="flex w-full text-sm text-Gray-6 border-none outline-none placeholder-gray-300 bg-transparent truncate"
                              defaultValue={item.content}
                              disabled={!editable}
                              placeholder={item.content}
                              onChange={(event) => {
                                setChangeData(true);
                                onChange(event?.target?.value);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {renderLogoutOrSaveChanges()}
              </div>
            </Transition>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default UserProfilePopover;
