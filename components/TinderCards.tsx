import ThreeScene from '@/pages/[locale]/three-scene';
import React, { useState, useRef } from 'react';
import { SimpleScene } from './SimpleScene';

const people = [
  'https://jonasward.eu/assets/sdfLamps_28-9cFV6c5L.jpg',
  'https://jonasward.eu/assets/sdfLamps_31-wvag9_rw.jpg',
  'https://jonasward.eu/assets/sdfLamps_35-zVWyfGh6.jpg'
];

const TinderCards = () => {
  const [cards, setCards] = useState(people);
  const dragData = useRef({ offsetX: 0, offsetY: 0, startX: 0, startY: 0, index: 0 });

  const startDrag = (e: any, index: number) => {
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const y = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    dragData.current = { startX: x, startY: y, offsetX: 0, offsetY: 0, index };
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('touchmove', moveDrag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  };

  const moveDrag = (e: any) => {
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const y = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    dragData.current.offsetX = x - dragData.current.startX;
    dragData.current.offsetY = y - dragData.current.startY;
    const card = document.getElementById(`card-${dragData.current.index}`);
    if (card) {
      const rotate = dragData.current.offsetX / 20;
      card.style.transform = `translate(${dragData.current.offsetX}px, ${dragData.current.offsetY}px) rotate(${rotate}deg)`;
    }
  };

  const endDrag = () => {
    const { offsetX, index } = dragData.current;
    const card = document.getElementById(`card-${index}`);
    if (Math.abs(offsetX) > 120) {
      const direction = offsetX > 0 ? 1000 : -1000;
      if (card) {
        card.style.transform = `translate(${direction}px, ${dragData.current.offsetY}px) rotate(${
          direction > 0 ? 45 : -45
        }deg)`;
        card.style.opacity = '0';
      }
      setTimeout(() => {
        setCards((prev) => prev.filter((_, i) => i !== index));
      }, 300);
    } else {
      if (card) card.style.transform = '';
    }

    document.removeEventListener('mousemove', moveDrag);
    document.removeEventListener('touchmove', moveDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-80 h-[500px]">
        {cards.map((url, index) => (
          <div
            key={url}
            id={`card-${index}`}
            className="absolute inset-0 rounded-2xl shadow-lg bg-cover bg-center cursor-grab"
            onMouseDown={(e) => startDrag(e, index)}
            onTouchStart={(e) => startDrag(e, index)}
          >
            <SimpleScene className="rounded-2xl" withOrbitControls={false} />
            <div className="absolute bottom-10 left-0 right-0 text-white text-center">this is a lamp</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TinderCards;
