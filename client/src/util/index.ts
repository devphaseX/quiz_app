interface ExternalFulfilPromise<R> {
  resolve: (result: R) => void;
  reject: (reason: unknown) => void;
  promise: Promise<R>;
}

function getExternalFulfillPromise<R = unknown>(): ExternalFulfilPromise<R> {
  let res!: (result: R) => void;
  let rej!: (reason: unknown) => void;
  const promise = new Promise<R>((_res, _rej) => {
    res = _res;
    rej = _rej;
  });

  return { resolve: res, reject: rej, promise };
}

const defaultFallback = Symbol();

const delayResolve = <T>(
  ms: number,
  value: T | typeof defaultFallback | (() => T) = defaultFallback
) => {
  const { promise, resolve, reject } = getExternalFulfillPromise<T>();
  setTimeout(() => {
    if (value === defaultFallback) return;
    try {
      let result = typeof value === 'function' ? (value as Function)() : value;
      resolve(result);
    } catch (e) {
      reject(e);
    }
  }, ms);
  return promise;
};

const nanoid = () => Math.random().toString(32).slice(2);
export type { ExternalFulfilPromise };
export { getExternalFulfillPromise, delayResolve, nanoid };
