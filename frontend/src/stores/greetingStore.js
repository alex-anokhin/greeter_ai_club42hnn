import { create } from "zustand"

const greetingStore = (set) => ({
	loading: false,
	setLoading: (value) => set({loading: value}),
});

const useGreetingStore = create(greetingStore);
export default useGreetingStore;