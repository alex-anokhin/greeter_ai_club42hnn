import { create } from "zustand";

const	generateVideoStore = (set) => ({
	loading: false,
	setLoading: (value) => set({loading: value}),
});

const	useGenerateVideoStore = create(generateVideoStore);
export default useGenerateVideoStore;