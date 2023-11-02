import { create } from 'zustand'
import ramda from 'ramda'
  
interface InstallStoreState {
    items: { [key: string]: string | boolean | number | object | object[] | string[] | null };
    addItem: (key: string, item: string | boolean | number | object | object[] | string[] | number[] | null) => void;
    updateItem: (key: string, updatedItem: Partial<string | boolean | number | object | object[] | string[] | number[]>) => void;
    getItem: (key: string) => string | boolean | number | object | object[] | string[] | number[] | null;
    updateItemRamda: (path: (string | number)[], key: string | boolean | number) => void;
    getAll: () => { [key: string]: string | boolean | number | object | object[] | string[] | number[] | null};
}
  
  
const useInstallStore = create<InstallStoreState>((set, get) => ({
    items: {},
    addItem: (key, item) =>
        set((state) => ({ items: { ...state.items, [key]: item } })),
    updateItem: (key, updatedItem) =>
        set((state) => ({
            items: {
                ...state.items,
                [key]: updatedItem,
            },
        })),
    getItem: (key) => get().items[key] || null,
    getAll: () => get().items,
    updateItemRamda: (path, key) => 
        set(ramda.over(ramda.lensPath(path), () => key)),
}));
  
export default useInstallStore;
  