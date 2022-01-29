import { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';

type serviceParams = {
  params?: any,
  signal?: AbortSignal,
};

type useServiceParams = {
  initialData: any,
  autoCancel?: boolean,
  service: ({
    params,
  }: serviceParams) => Promise<any>,
};

export const useService = function useServiceHook({
  initialData = null,
  autoCancel = true,
  service,
}: useServiceParams) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);
  const [initData] = useState(initialData);
  const controller = useRef<AbortController | null>(null);

  const cancel = useCallback(() => {
    try {
      controller.current?.abort();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const resetData = useCallback(() => setData(initData), [initData]);

  const fetch = useCallback(async (params) => {
    if (autoCancel) {
      cancel();
    }

    controller.current = new AbortController();

    setIsFetching(true);
    setError(null);

    try {
      const response = await service({
        params,
        signal: controller.current.signal,
      });

      setData(response);
      setIsFetching(false);
    } catch (thrown) {
      if (!axios.isCancel(thrown)) {
        setIsFetching(false);
        setError(thrown);
      }
    }
  }, [autoCancel, service, cancel]);

  useEffect(() => (
    () => {
      cancel();
      setIsFetching(false);
      setError(null);
    }
  ), [cancel]);

  return {
    fetch,
    cancel,
    resetData,

    isFetching,
    error,
    data,
  };
};
