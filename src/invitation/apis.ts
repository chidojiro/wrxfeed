import { Contact } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { withDefaultPaginationParams } from '@/rest/utils';
import { GetInvitationContactsParams, SendInvitationPayload } from './types';

const send = (payload: SendInvitationPayload) =>
  RestApis.post('/inv/invitations', payload).then((res) => ({
    link: res,
  }));

const accept = (id: string) => RestApis.patch(`/inv/invitations/${id}`);

const getContacts = (params: GetInvitationContactsParams) =>
  RestApis.get<Contact[]>('/inv/contacts', { params: withDefaultPaginationParams(params) });

export const InvitationApis = { send, accept, getContacts };
