import { Ref, useImperativeHandle, useRef } from 'react';

const SWIPE_X_REGISTRATION_DISTANCE = 60;

export type TinderCardHandle = { swipe: (liked: boolean) => void };

export const TinderCard = ({
  url,
  index,
  onLike,
  onDislike,
  active,
  name,
  ref
}: {
  url: string;
  index: number;
  onLike: () => void;
  onDislike: () => void;
  active: boolean;
  name: string;
  ref?: Ref<TinderCardHandle>;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const dragData = useRef({ offsetX: 0, offsetY: 0, startX: 0, startY: 0, dragging: false });

  const fling = (liked: boolean, offsetY = 0, rotate = liked ? 15 : -15) => {
    if (!elementRef.current) return;
    elementRef.current.style.transition = 'all 0.3s ease-in-out';
    elementRef.current.style.transform = `translate(${liked ? 500 : -500}px, ${offsetY}px) rotate(${rotate}deg)`;
    elementRef.current.style.opacity = '0';
    setTimeout(() => (liked ? onLike() : onDislike()), 300);
  };

  useImperativeHandle(ref, () => ({ swipe: (liked) => fling(liked) }));

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
      elementRef.current.style.transition = 'transform 0.3s ease-in-out';
    }
  };

  return (
    <div
      key={url}
      ref={elementRef}
      id={`card-${index}`}
      className="absolute inset-0 rounded-2xl shadow-lg bg-cover bg-center cursor-grab bg-image-contain transition-shadow duration-300 touch-none select-none"
      style={{
        backgroundImage: `url(${url})`,
        filter: active ? 'grayscale(0)' : 'grayscale(0.8)',
        zIndex: 1000 - index
      }}
      onPointerDown={active ? startDrag : undefined}
      onPointerMove={active ? moveDrag : undefined}
      onPointerUp={active ? endDrag : undefined}
      onPointerCancel={active ? endDrag : undefined}
    >
      <div className="absolute bottom-10 left-0 right-0 text-white text-center">{name}</div>
    </div>
  );
};
