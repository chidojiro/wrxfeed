export default class DeferredObject<T> {
  public readonly promise: Promise<T>;

  public resolve: (value: T | PromiseLike<T>) => void;

  public reject: (reason?: unknown) => void;

  constructor() {
    this.resolve = () => undefined;
    this.reject = () => undefined;
    this.promise = new Promise((rs, rj) => {
      this.resolve = rs;
      this.reject = rj;
    });
  }
}
