type ResponsiveImage = {
    srcSet: string;
    width: number;
    height: number;
};

const RESPONSIVE_IMAGES: Record<string, ResponsiveImage> = {
    "/gelatto-hero-1280.webp": {
        srcSet: "/gelatto-hero-640.webp 640w, /gelatto-hero-1280.webp 1280w",
        width: 1280,
        height: 960,
    },
    "/gelatto-atacado-1280.webp": {
        srcSet: "/gelatto-atacado-640.webp 640w, /gelatto-atacado-1280.webp 1280w",
        width: 1280,
        height: 853,
    },
    "/gelatto-picoles-1280.webp": {
        srcSet: "/gelatto-picoles-640.webp 640w, /gelatto-picoles-1280.webp 1280w",
        width: 1280,
        height: 720,
    },
    "/gelatto-acai-mobile-1024.webp": {
        srcSet: "/gelatto-acai-mobile-640.webp 640w, /gelatto-acai-mobile-1024.webp 1024w",
        width: 1024,
        height: 1536,
    },
};

export function getResponsiveImageProps(src: string, sizes: string) {
    const image = RESPONSIVE_IMAGES[src];

    if (!image) return { src };

    return {
        src,
        srcSet: image.srcSet,
        sizes,
        width: image.width,
        height: image.height,
    };
}
