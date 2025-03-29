'use client';
import { use } from 'react';

export default function useQuery<T>({ fn, key }: useQueryPropsType) {
  const promiseCache = new Map<string, Promise<T>>();
  if(!promiseCache.has(key)) promiseCache.set(key, fn());

  const promise = promiseCache.get(key) as Promise<T>;
  return use(promise);
}