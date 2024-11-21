export interface IUpload {
    path: string;
    media: string;
    bytes: Uint8Array;
}

class Upload implements IUpload {
    path: string;
    media: string;
    bytes: Uint8Array;

    constructor({ path = '', media = '', bytes = new Uint8Array() }: Partial<IUpload> = {}) {
        this.path = path;
        this.media = media;
        this.bytes = bytes;
    }

    static fromJson(json: any): Upload {
        return new Upload({
            path: json.path || '',
            media: json.media || '',
            bytes: json.bytes ? new Uint8Array(json.bytes) : new Uint8Array(),
        });
    }

    toJson(): any {
        return {
            path: this.path,
            media: this.media,
            bytes: Array.from(this.bytes),
        };
    }
}

export default Upload;
