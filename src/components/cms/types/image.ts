export default interface ImageProps {
    id: number;
    name: string;
    alternativeText?: any;
    caption?: any;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata: Providermetadata;
    createdAt: string;
    updatedAt: string;
    blurhash: string;
}

interface Providermetadata {
    public_id: string;
    resource_type: string;
}