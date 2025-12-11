import useSWR from 'swr';
import { fetcher } from '../lib/api.js';

export const useResource = (endpoint, options = {}) => {
  const swr = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    ...options,
  });

  const isArrayData = Array.isArray(swr.data);

  return {
    ...swr,
    items: isArrayData ? swr.data : [],
    isEmpty: isArrayData ? !swr.data?.length : !swr.data,
  };
};

export default useResource;
