import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export type PictureSource = { type: string; srcset: string };
/** Everything a `<picture>` needs; serialisable so islands can receive it as a prop. */
export type LampPicture = { src: string; sources: PictureSource[]; sizes?: string; width: number; height: number };

/** Widths generated for every lamp photo; the sources are 1024 px wide. */
export const LAMP_WIDTHS = [320, 480, 640, 828, 1024];

/** `sizes` per place a lamp photo appears, matching the Tailwind layout of each. */
export const LAMP_SIZES = {
  hero: '100vw',
  carousel: '(min-width: 424px) 288px, 68vw',
  // The card is taller than the 3:4 photo and uses object-cover, so its height decides the width.
  deck: 'max(min(85vw, 600px), min(calc((100vh - 9rem) * 0.75), 600px))',
  grid: '(min-width: 640px) 280px, 46vw',
  detail: '(min-width: 768px) min(50vw, 600px), 100vw'
};

const FORMATS = [
  { format: 'avif', type: 'image/avif', quality: 60 },
  { format: 'webp', type: 'image/webp', quality: 72 }
] as const;

/** AVIF and WebP sources with the original JPEG as fallback, optionally at several widths for `sizes`. */
export const lampPicture = async (
  image: ImageMetadata,
  { widths, sizes }: { widths?: number[]; sizes?: string } = {}
): Promise<LampPicture> => {
  const modern = await Promise.all(
    FORMATS.map(({ format, quality }) => getImage({ src: image, format, quality, widths, sizes }))
  );
  return {
    // Only browsers without WebP (pre-2020) use this, so the untouched source file is fine.
    src: image.src,
    sources: modern.map((result, i) => ({ type: FORMATS[i].type, srcset: result.srcSet.attribute || result.src })),
    sizes,
    width: image.width,
    height: image.height
  };
};
