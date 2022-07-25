import { PaginationParams } from '@/rest/types';

export type GetInvitationContactsParams = PaginationParams & {
  text: string;
};

export type SendInvitationPayload = { email: string };
