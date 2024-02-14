import Image, { ImageProps } from 'next/image'

const EMPTY_IMG_SOURCE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

const AutoHeightImage = ({ alt, src }: ImageProps) => {
  return (
    <div className="!relative">
      <Image
        className="!object-contain !relative !h-auto"
        fill
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={EMPTY_IMG_SOURCE}
      />
    </div>
  )
}

export default AutoHeightImage
