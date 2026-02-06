import NextImage, { ImageProps } from "next/image";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src: string;
  className?: string;
}

export const Image: React.FC<CustomImageProps> = ({
  src,
  width,
  className,
  height,
  alt,
  ...props
}) => {
  return (
    <NextImage
      className={className}
      src={src}
      width={width || 0}
      height={height || 0}
      alt={alt}
      {...props}
    />
  );
};
