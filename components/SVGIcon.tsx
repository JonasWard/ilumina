export const SVGIcon: React.FC<{ src: string; className?: string; alt?: string }> = ({ src, className, alt = '' }) => (
  <img src={src} alt={alt} className={className ?? 'h-8'} />
);
