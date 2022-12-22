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

export type { ExternalFulfilPromise };
export { getExternalFulfillPromise };
