import { create } from 'zustand';

export const LOCAL_STORAGE_KEY_LIKED = 'liked';
export const LOCAL_STORAGE_KEY_DISLIKED = 'disliked';

type LampStore = {
  hydrated: boolean;
  liked: Set<number>;
  disliked: Set<number>;
  _updateLiked: (liked: Set<number>) => void;
  _updateDisliked: (disliked: Set<number>) => void;
  addLiked: (liked: number) => void;
  addDisliked: (disliked: number) => void;
  removeLiked: (likedId: number) => void;
  removeDisliked: (disliked: number) => void;
  resetRatings: () => void;
  toggleLike: (index: number) => void;
  toggleDislike: (index: number) => void;
};

export const useLampStore = create<LampStore>((set, get) => ({
  hydrated: false,
  liked: new Set(),
  disliked: new Set(),
  _updateLiked: (liked) => {
    set(() => ({ liked }));
    localStorage.setItem(LOCAL_STORAGE_KEY_LIKED, JSON.stringify([...liked.values()]));
  },
  _updateDisliked: (disliked) => {
    set(() => ({ disliked }));
    localStorage.setItem(LOCAL_STORAGE_KEY_DISLIKED, JSON.stringify([...disliked.values()]));
  },
  addLiked: (liked) => {
    get()._updateLiked(new Set([...get().liked, liked]));
  },
  addDisliked: (disliked) => get()._updateDisliked(new Set([...get().disliked, disliked])),
  removeLiked: (likedId) => get()._updateLiked(new Set([...get().liked].filter((i) => i !== likedId))),
  removeDisliked: (dislikedId) => get()._updateDisliked(new Set([...get().disliked].filter((i) => i !== dislikedId))),
  toggleLike: (index) => {
    if (get().liked.has(index)) return get().removeLiked(index);
    get().removeDisliked(index);
    get().addLiked(index);
  },
  toggleDislike: (index) => {
    if (get().disliked.has(index)) return get().removeDisliked(index);
    get().removeLiked(index);
    get().addDisliked(index);
  },
  resetRatings: () => {
    get()._updateLiked(new Set());
    get()._updateDisliked(new Set());
  }
}));