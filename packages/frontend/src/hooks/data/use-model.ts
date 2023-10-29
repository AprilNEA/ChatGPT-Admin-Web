'use client';

import { useCallback } from 'react';
import useSWR from 'swr';

import { useStore } from '@/store';

type ModelInfo = {
  id: number;
  name: string;
};

export const useModelData = () => {
  const { fetcher } = useStore();
  const { data: models, isLoading: modelLoading } = useSWR<ModelInfo[]>(
    '/product/models',
    (url) =>
      fetcher(url)
        .then((res) => res.json())
        .then((res) => res.data),
  );

  const getModelName = useCallback(
    (id: number) => {
      if (!models) return null;
      const model = models.find((element: ModelInfo) => element.id === id);
      return model ? model.name : null;
    },
    [models],
  );

  return { models, modelLoading, getModelName };
};
