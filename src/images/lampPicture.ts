import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export type PictureSource = { type: string; srcset: string };
/** Everything a `<picture>` needs; serialisable so islands can receive it as a prop. */
export type LampPicture = { src: string; sources: PictureSource[]; sizes?: string; width: number; height: number };

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
