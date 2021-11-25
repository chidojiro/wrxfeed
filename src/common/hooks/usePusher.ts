import Pusher from 'pusher-js';

const APP_KEY_PUSHER = '4869e37d167fcddb177c';
const APP_CLUSTER = 'mt1';

export const startPusher = () => {
  const pusher = new Pusher(APP_KEY_PUSHER, {
    cluster: APP_CLUSTER,
  });
  const userId = 12;
  const channel = pusher.subscribe(`feed-${userId}`);
  channel.bind('new-item', (data: any) => {
    console.log(`Check channel bind data = ${JSON.stringify(data)}`);
  });
};

// interface PusherData {
//   isConnect: boolean;
// }

// export const usePusher = (callback: FileUploaderCallback): PusherData => {
//   const { getUploadFileToken, uploadAttachment } = useApi();

//   return {
//     isUploading,
//     uploadFile,
//   };
// };
