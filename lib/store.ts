import { create } from 'zustand';

type LampStore = {
  liked: string[];
  disliked: string[];
  addLiked: (liked: string) => void;
  addDisliked: (disliked: string) => void;
  removeLiked: (liked: string) => void;
  removeDisliked: (disliked: string) => void;
};

export const useLampStore = create<LampStore>((set) => ({
  liked: [],
  disliked: [],
  addLiked: (liked) => set((state) => ({ liked: [...state.liked.filter((l) => l !== liked), liked] })),
  addDisliked: (disliked) =>
    set((state) => ({ disliked: [...state.disliked.filter((d) => d !== disliked), disliked] })),
  removeLiked: (liked) => set((state) => ({ liked: state.liked.filter((l) => l !== liked) })),
  removeDisliked: (disliked) => set((state) => ({ disliked: state.disliked.filter((d) => d !== disliked) }))
}));
