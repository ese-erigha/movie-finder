import { AxiosInstance, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface HttpError {
  response: { status: number };
  message: string;
}

const useHttpErrorHandler = (httpClient: AxiosInstance): [HttpError | null, () => void] => {
  const [error, setError] = useState<HttpError | null>(null);
  const responseInterceptor = httpClient.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: HttpError) => {
      setError(err);
      throw err;
    },
  );

  useEffect(
    () => () => {
      httpClient.interceptors.response.eject(responseInterceptor);
    },
    [httpClient.interceptors.response, responseInterceptor],
  );

  const clearErrorHandler = () => setError(null);

  return [error, clearErrorHandler];
};

export default useHttpErrorHandler;
