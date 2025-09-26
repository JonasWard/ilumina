import { create } from 'zustand';

type LampStore = {
  liked: Set<number>;
  disliked: Set<number>;
  addLiked: (liked: number) => void;
  addDisliked: (disliked: number) => void;
  removeLiked: (liked: number) => void;
  removeDisliked: (disliked: number) => void;
};

export const useLampStore = create<LampStore>((set) => ({
  liked: new Set(),
  disliked: new Set(),
  addLiked: (liked) => set((state) => ({ liked: new Set([...state.liked, liked]) })),
  addDisliked: (disliked) => set((state) => ({ disliked: new Set([...state.disliked, disliked]) })),
  removeLiked: (liked) => set((state) => ({ liked: new Set([...state.liked, liked]) })),
  removeDisliked: (disliked) => set((state) => ({ disliked: new Set([...state.disliked, disliked]) }))
}));
