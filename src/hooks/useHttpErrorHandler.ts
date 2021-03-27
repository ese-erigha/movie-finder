import { AxiosInstance, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface HttpError {
  response: { status: number };
  message: string;
}

export type HttpErrorHandlerHookResponse = {
  error: HttpError | null;
  clearErrorHandler: () => void;
};

const useHttpErrorHandler = (httpClient: AxiosInstance): HttpErrorHandlerHookResponse => {
  const [error, setError] = useState<HttpError | null>(null);
  const responseInterceptor = httpClient.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: HttpError) => {
      setError(err);
    },
  );

  useEffect(
    () => () => {
      httpClient.interceptors.response.eject(responseInterceptor);
    },
    [httpClient.interceptors.response, responseInterceptor],
  );
  const clearErrorHandler = () => setError(null);
  return { error, clearErrorHandler };
};

export default useHttpErrorHandler;
