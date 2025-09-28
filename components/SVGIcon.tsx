export const SVGIcon: React.FC<{ src: string; className?: string }> = ({ src, className }) => (
  <img src={src} alt="logo" className={className ?? 'h-8'} />
);
