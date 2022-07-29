import { Contact } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { withDefaultPaginationParams } from '@/rest/utils';
import { GetInvitationContactsParams, SendInvitationPayload } from './types';

const send = (payload: SendInvitationPayload): Promise<void> =>
  RestApis.post('/inv/invitations', payload);

const accept = (id: string) => RestApis.patch(`/inv/invitations/${id}`);

const getContacts = (params: GetInvitationContactsParams) =>
  RestApis.get<Contact[]>('/inv/contacts', { params: withDefaultPaginationParams(params) });

export const InvitationApis = { send, accept, getContacts };
