import { type Ref, useImperativeHandle, useRef } from 'react';
import heart from '/assets/icons/heart.svg?url';
import brokenHeart from '/assets/icons/heart_broken.svg?url';

const SWIPE_X_REGISTRATION_DISTANCE = 60;

export type TinderCardHandle = { swipe: (liked: boolean) => void };

export const TinderCard = ({
  url,
  index,
  onLike,
  onDislike,
  active,
  name,
  alt,
  loading,
  sources,
  sizes,
  ref
}: {
  url: string;
  index: number;
  onLike: () => void;
  onDislike: () => void;
  active: boolean;
  name: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  /** Modern formats for a `<picture>`; `url` stays the fallback. */
  sources?: { type: string; srcset: string }[];
  sizes?: string;
  ref?: Ref<TinderCardHandle>;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const dragData = useRef({ offsetX: 0, offsetY: 0, startX: 0, startY: 0, dragging: false });

  const gone = useRef(false);
  const likeStampRef = useRef<HTMLDivElement>(null);
  const dislikeStampRef = useRef<HTMLDivElement>(null);

  const setStamps = (offsetX: number) => {
    const strength = Math.min(1, Math.abs(offsetX) / SWIPE_X_REGISTRATION_DISTANCE);
    if (likeStampRef.current) likeStampRef.current.style.opacity = String(offsetX > 0 ? strength : 0);
    if (dislikeStampRef.current) dislikeStampRef.current.style.opacity = String(offsetX < 0 ? strength : 0);
  };

  const fling = (liked: boolean, offsetY = 0, rotate = liked ? 15 : -15) => {
    if (!elementRef.current || gone.current) return;
    gone.current = true;
    setStamps(liked ? 1000 : -1000);
    elementRef.current.style.transition = 'all 0.3s ease-in-out';
    elementRef.current.style.transform = `translate(${liked ? 500 : -500}px, ${offsetY}px) rotate(${rotate}deg)`;
    elementRef.current.style.opacity = '0';
    setTimeout(() => (liked ? onLike() : onDislike()), 300);
  };

  useImperativeHandle(ref ?? null, () => ({ swipe: (liked) => fling(liked) }));

  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragData.current = { startX: e.clientX, startY: e.clientY, offsetX: 0, offsetY: 0, dragging: true };
    elementRef.current.style.transition = '';
  };

  const moveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!elementRef.current || !dragData.current.dragging) return;
    dragData.current.offsetX = e.clientX - dragData.current.startX;
    dragData.current.offsetY = e.clientY - dragData.current.startY;
    const rotate = dragData.current.offsetX / 20;
    setStamps(dragData.current.offsetX);
    elementRef.current.style.transform = `translate(${dragData.current.offsetX}px, ${dragData.current.offsetY}px) rotate(${rotate}deg)`;

    if (dragData.current.offsetX > SWIPE_X_REGISTRATION_DISTANCE)
      elementRef.current.style.boxShadow = '#3fdd5e 0px 14px 28px, #3fdd5e 0px 0px 18px 14px';
    else if (dragData.current.offsetX < -SWIPE_X_REGISTRATION_DISTANCE)
      elementRef.current.style.boxShadow = '#d14949 0px 14px 28px, #d14949 0px 0px 18px 14px';
    else elementRef.current.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 14px 28px, rgba(0, 0, 0, 0.1) 0px 0px 18px 14px';
  };

  const endDrag = () => {
    if (!elementRef.current || !dragData.current.dragging) return;
    dragData.current.dragging = false;
    const { offsetX, offsetY } = dragData.current;
    if (Math.abs(offsetX) > SWIPE_X_REGISTRATION_DISTANCE) fling(offsetX > 0, offsetY, offsetX / 20);
    else {
      elementRef.current.style.transform = '';
      elementRef.current.style.opacity = '1';
      elementRef.current.style.boxShadow = '';
      setStamps(0);
      elementRef.current.style.transition = 'transform 0.3s ease-in-out';
    }
  };

  return (
    <div
      key={url}
      ref={elementRef}
      id={`card-${index}`}
      className="absolute inset-0 rounded-2xl overflow-clip shadow-lg cursor-grab transition-shadow duration-300 touch-none select-none"
      style={{
        filter: active ? 'grayscale(0)' : 'grayscale(0.8)',
        zIndex: 1000 - index
      }}
      onPointerDown={active ? startDrag : undefined}
      onPointerMove={active ? moveDrag : undefined}
      onPointerUp={active ? endDrag : undefined}
      onPointerCancel={active ? endDrag : undefined}
    >
      <picture style={{ display: 'contents' }}>
        {sources?.map((source) => <source key={source.type} type={source.type} srcSet={source.srcset} sizes={sizes} />)}
        <img
          src={url}
          alt={alt}
          loading={loading}
          draggable={false}
          decoding="async"
          fetchPriority={active ? 'high' : 'auto'}
          className="absolute inset-0 size-full object-cover pointer-events-none"
        />
      </picture>
      <div
        ref={likeStampRef}
        className="absolute top-6 left-6 grid place-items-center size-16 rounded-full bg-white/90 border-4 border-green-500 -rotate-12 opacity-0 pointer-events-none"
      >
        <img src={heart} alt="" className="size-8" />
      </div>
      <div
        ref={dislikeStampRef}
        className="absolute top-6 right-6 grid place-items-center size-16 rounded-full bg-white/90 border-4 border-red-500 rotate-12 opacity-0 pointer-events-none"
      >
        <img src={brokenHeart} alt="" className="size-8" />
      </div>
      <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-linear-to-t from-black/70 to-transparent pt-16 pb-6 text-lg text-white text-center pointer-events-none">
        {name}
      </div>
    </div>
  );
};
