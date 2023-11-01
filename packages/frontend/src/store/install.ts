import { create } from 'zustand'

interface Item {
    name: string;
    value: string | object
  }
  
interface InstallStoreState {
    items: { [key: string]: Item };
    addItem: (key: string, item: Item) => void;
    updateItem: (key: string, updatedItem: Partial<Item>) => void;
    findItem: (key: string) => Item | null;
    getAll: () => object;

}
  
const useInstallStore = create<InstallStoreState>((set, get) => ({
    items: {},
    addItem: (key: string, item: Item) =>
        set((state) => ({ items: { ...state.items, [key]: item } })),
    updateItem: (key: string, updatedItem: Partial<Item>) =>
        set((state) => ({
            items: {
                ...state.items,
                [key]: { ...state.items[key], ...updatedItem },
            },
        })),
    findItem: (key: string) => get().items[key] || null,
    getAll: () => get().items,
}));
  
export default useInstallStore;
  