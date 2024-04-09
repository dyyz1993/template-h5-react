import { before } from 'lodash';
import { useEffect, useRef, useState } from 'react';

interface Option<T, R> {
  deal: (res: T) => R;
  before?: () => void;
  afterDeal?: (res: R, o: T) => void;
  deps?: any[];
}
interface Action {
  refresh: () => void;
  requestCount: number;
}
export function useRequest<T = any, R = any>(
  fn: () => Promise<T>,
  option: Option<T, R>
): [R | undefined, Action] {
  const [state, setState] = useState<R | undefined>();
  const [count, setCount] = useState(0);
  const requestCountRef = useRef(0);

  const { before, deal, deps = [], afterDeal } = option || {};

  async function refresh() {
    setCount((c) => c + 1);
  }

  useEffect(() => {
    async function main() {
      const ret = await fn();
      const dealData = deal?.(ret);
      setState(dealData);
      afterDeal?.(dealData, ret);
      return dealData;
    }
    main();
    requestCountRef.current++;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, count]);
  if (before) {
    before?.();
  }
  return [
    state,
    {
      refresh,
      requestCount: requestCountRef.current
    }
  ];
}

export function useLoadMore<T = any, R = any>(
  fn: () => Promise<T>,
  deal: (res: T) => Promise<[boolean, R | undefined]>,
  deps: any[] = []
): [boolean, R | undefined] {
  const [state, setState] = useState<[boolean, R | undefined]>([true, undefined]);
  useEffect(() => {
    async function main() {
      const ret = await fn();
      const data = await deal(ret);
      setState(data);
    }
    main();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return [...state];
}
