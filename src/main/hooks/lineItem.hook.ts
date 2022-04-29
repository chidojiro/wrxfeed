// import { useApi } from '@api';
// import { useErrorHandler } from '@error/hooks';
// import { isBadRequest } from '@error/utils';
// import { Contact, TransLineItem } from '@main/entity';
// import { useState } from 'react';
// import { toast } from 'react-toastify';

// interface LineItemValues {
//   lineItem: TransLineItem | null;
//   isLoading: boolean;
//   getLineItemById: (id: number) => Promise<void>;
// }

// export function useLineItem(): LineItemValues {
//   const ApiClient = useApi();
//   const [lineItem, setLineItem] = useState<TransLineItem>();
//   const errorHandler = useErrorHandler();
//   const [isLoading, setLoading] = useState(false);

//   const getLineItemById = async (id: number) => {
//     try {
//       setLoading(true);
//       const res = await ApiClient.getLineItemById(id);
//       setLineItem(res);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       if (isBadRequest(error)) {
//         toast.error('Can not send invite!');
//       } else {
//         await errorHandler(error);
//       }
//     }
//   };
//   return { isLoading, getLineItemById };
// }
