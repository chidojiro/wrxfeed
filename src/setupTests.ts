// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { server } from '@/integration-test/server';

beforeAll(() => {
  server.listen();
  userEvent.setup();
});

beforeEach(() => {
  server.resetHandlers();
  jest.useFakeTimers();
});

afterEach(() => {
  server.close();
  jest.clearAllMocks();
});
