import { useState, useCallback } from 'react';

type HttpRequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';
export type loadingStatusOptions = 'idle' | 'loading' | 'error';

interface HttpHeader {
    [key: string]: string
}

// type HttpHeader = Record<string, string>;

interface RequestConfig {
    url: string,
    method?: HttpRequestMethods,
    body?: string | null,
    headers?: HttpHeader
}

export const useHttp = () => {
    const [loadingStatus, setLoadingStatus] = useState<loadingStatusOptions>('idle');


    const request = useCallback(
        async ({ url,
            method = "GET",
            body = null,
            headers = { "Content-type": "application/json" } }: RequestConfig
        ) => {
            setLoadingStatus('loading');

            try {
                const response = await fetch(url, { method, body, headers });

                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }


                const data = await response.json();

                setLoadingStatus('idle');

                return data;
            } catch (e) {
                setLoadingStatus('error');
                throw e;
            }

        }, []);
    return { request, loadingStatus };
}

