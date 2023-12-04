import ImageProps from '../cms/types/image';
import NextImage from 'next/image';

import NoImage from '../../../public/images/noimage.png'

interface Props {
    src: ImageProps | undefined
    alt?: string
}

const Image: React.FC<Props> = ({ src, alt }: Props): JSX.Element => {
    if (!src) {
        return <NextImage src={NoImage} alt="image not available" />
    }
    return <NextImage src={src.url} height={src.height} width={src.width} alt={alt || src.alternativeText || "image"} />
}

export default Image;