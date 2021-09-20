import DeferredObject from './DeferredObject';
import { ApiClient } from './types';

// A deferred object created to access ApiUtils outside of Component
const deferred = new DeferredObject<ApiClient>();

export function getApiClient(): PromiseLike<ApiClient> {
  return deferred.promise;
}

export function setApiClient(val: ApiClient): void {
  deferred.resolve(val);
}
