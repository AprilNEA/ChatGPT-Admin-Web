import * as ramda from 'ramda';
import { create } from 'zustand';

import { ISettingResultValue } from 'shared';

type pathLens = (string | number)[];

interface InstallStoreState {
  settings: any;
  // settings: ISettingResult;
  _getFullPath: (key: pathLens) => pathLens;
  getSettingItem: (path: pathLens) => ISettingResultValue | undefined;
  updateSettingItem: (path: pathLens, value: ISettingResultValue) => void;
  addEmptyValue: (path: pathLens) => void;
  addEmptyKeyValue: (path: pathLens, keys: string[]) => void;
  updateKeyValue: (
    path: pathLens,
    index: number,
    key: string,
    value: ISettingResultValue,
  ) => void;
  removeKeyValue: (path: pathLens, index: number) => void;
}

const useInstallStore = create<InstallStoreState>((set, get) => ({
  settings: {},
  _getFullPath: (key) => ['settings', ...key],
  getSettingItem: (path) => ramda.path(path, get().settings),
  updateSettingItem: (path, value) =>
    set(ramda.over(ramda.lensPath(get()._getFullPath(path)), () => value)),
  addEmptyValue: (path) => {
    set(
      ramda.over(ramda.lensPath(get()._getFullPath(path)), (old) => [
        ...old,
        '',
      ]),
    );
  },
  addEmptyKeyValue: (path, keys) => {
    set(
      ramda.over(ramda.lensPath(get()._getFullPath(path)), (old) => {
        const newPart = keys.reduce((obj, key) => ({ ...obj, [key]: '' }), {});
        return !!old ? [...old, newPart] : [newPart];
      }),
    );
  },
  updateKeyValue: (path, index, key, value) => {
    set(
      ramda.over(
        ramda.lensPath([...get()._getFullPath(path), index]),
        (old) => ({
          ...old,
          [key]: value,
        }),
      ),
    );
  },
  removeKeyValue: (path, index) => {
    set(
      ramda.over(ramda.lensPath(get()._getFullPath(path)), (oldArray) =>
        ramda.remove(index, 1, oldArray),
      ),
    );
  },
}));

export default useInstallStore;
