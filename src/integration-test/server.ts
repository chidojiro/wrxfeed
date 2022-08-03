import { TargetMockHandlers } from '@/target/mockHandlers';
import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import { setupServer } from 'msw/node';

const getHandlers = (handlers: Record<string, () => RestHandler<MockedRequest<DefaultBodyType>>>) =>
  Object.values(handlers).map((getHandler) => getHandler());

const handlers = [TargetMockHandlers].map(getHandlers).flat();

export const server = setupServer(...handlers);
